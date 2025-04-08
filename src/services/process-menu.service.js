import { callOpenAI, parseOpenAIResponse } from './agi.service.js';
import {
  callVisionAPIForImage,
  combineVisionResponses,
} from './ocr.service.js';

import { db } from '../config/db.config.js';

async function getExistingGptResult(id) {
  try {
    const categoriesRef = db
      .collection('menuz')
      .doc(id)
      .collection('categoriez');
    const snapshot = await categoriesRef.get();

    if (snapshot.empty) {
      console.log('No categories found for menu:', id);
      return null;
    }

    const allCategories = [];
    snapshot.forEach((doc) => {
      const categoryData = doc.data();
      try {
        const parsed = parseOpenAIResponse(categoryData.gptResult);
        allCategories.push({
          id: doc.id,
          ...parsed,
        });
      } catch (error) {
        console.error(`Error parsing category ${doc.id}:`, error);
      }
    });

    return allCategories.length > 0 ? allCategories : null;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

async function processNewImages(files, id) {
  const responses = [];
  for (const file of files) {
    const visionResponse = await callVisionAPIForImage(file);
    responses.push(visionResponse);
  }
  return combineVisionResponses(responses, id);
}

async function processImages(files, id) {
  const existingResult = await getExistingGptResult(id);
  if (existingResult) return existingResult;

  const contexts = await processNewImages(files, id);

  // Call the AGI (ChatGPT) service using the combined contexts
  const rawJSON = await callOpenAI(contexts);
  const parsedResult = parseOpenAIResponse(rawJSON);
  const menuRef = db.collection('menuz').doc(id);

  // Add categories to subcollection with transaction
  try {
    await db.runTransaction(async (transaction) => {
      // Add each category to 'categoriez' subcollection
      await Promise.all(
        parsedResult.menu.categories.map(async (category) => {
          const categoryRef = menuRef.collection('categoriez').doc();

          transaction.set(categoryRef, {
            ...category,
          });
        })
      );

      // Update main document with processing status
      transaction.update(menuRef, {
        isProcessed: true,
      });
    });

    console.log(
      `Successfully added ${parsedResult.menu.categories.length} categories`
    );
  } catch (error) {
    console.error('Error writing categories to Firestore:', error);
    throw new Error('Failed to save categories to database');
  }

  return parsedResult;
}

export { processImages };
