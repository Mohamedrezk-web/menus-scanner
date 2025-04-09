import { slugify, deleteDocumentWithSubcollections } from '../utils/helpers.js';
import { processImages } from '../services/process-menu.service.js';
import { uploadImageToBucket } from '../utils/bucket.js';
import { db, bucket } from '../config/db.config.js';

const get = async (req, res) => {
  try {
    const snapshot = await db.collection('menuz').get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No menus found' });
    }

    const menus = [];
    snapshot.forEach((doc) => {
      menus.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load menu data' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuRef = db.collection('menuz').doc(id);
    const menuDoc = await menuRef.get();
    if (!menuDoc.exists) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const categoriesSnapshot = await menuRef.collection('categoriez').get();

    const categories = categoriesSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    return res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};

const updateCategory = async ({ params: { id, category } }, res) => {
  try {
    const categoryJson = JSON.parse(category);

    if (!categoryJson) {
      return res.status(400).json({
        error: 'Category JSON object with an "id" property is required.',
      });
    }

    const categoryRef = db
      .collection('menuz')
      .doc(id)
      .collection('categoriez')
      .doc(categoryJson.id);

    await categoryRef.set(categoryJson);

    res.json({
      message: 'Category fully replaced successfully.',
      updatedCategoryId: category.id,
      warning: 'This operation completely replaced all fields in the document',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const upload = async (req, res) => {
  let docRef; // Declare docRef here to handle cleanup
  try {
    const {
      files,
      body: { name },
    } = req;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    // 1. Create initial document with empty images array
    const newMenu = {
      name,
      slug: slugify(name),
      images: [],
      isProcessed: false,
    };

    // 2. Create document and get ID
    docRef = await db.collection('menuz').add(newMenu);
    const docId = docRef.id;

    // 3. Upload images to folder named with docId
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        try {
          const destination = `images/${docId}/`;
          return await uploadImageToBucket(file, destination);
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw new Error(`Failed to upload ${file.originalname}`);
        }
      })
    );

    // 4. Update document with image URLs
    await docRef.update({
      images: imageUrls,
    });

    res.json({ docId });
  } catch (error) {
    // Cleanup document if creation failed mid-process
    if (docRef) {
      await docRef.delete().catch((deleteError) => {
        console.error('Error cleaning up document:', deleteError);
      });
    }
    res.status(500).json({ error: error.message });
  }
};

const removeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'No ID provided' });
    }

    const docRef = db.collection('menuz').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete entire folder from bucket
    try {
      const prefix = `images/${id}/`;
      const [files] = await bucket.getFiles({ prefix });

      if (files.length > 0) {
        await Promise.all(files.map((file) => file.delete()));
        console.log(`Deleted ${files.length} files from folder ${prefix}`);
      }

      // Optional: Delete the placeholder "folder" (doesn't actually delete folders in GCS)
      const folderFile = bucket.file(prefix);
      await folderFile.delete().catch(() => {}); // Ignore if folder doesn't exist
    } catch (storageError) {
      console.error('Error deleting storage folder:', storageError);
      throw new Error('Failed to delete associated images');
    }

    // Delete all subcollections and document
    await deleteDocumentWithSubcollections(docRef);

    res.json({
      message: 'Document and associated images deleted successfully',
      deletedId: id,
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({
      error: error.message || 'Failed to delete document',
    });
  }
};

const procezz = async (req, res) => {
  const id = req.params.id;

  try {
    const [files] = await bucket.getFiles({ prefix: `images/${id}/` });

    if (!files || files.length === 0) {
      return res.status(404).json({ error: `No images found for id "${id}"` });
    }

    const imageBuffers = await Promise.all(
      files.map(async (file) => {
        try {
          const [buffer] = await file.download();
          return {
            buffer,
            originalname: file.name.split('/').pop(), // Extract filename
          };
        } catch (downloadError) {
          console.error(`Error downloading ${file.name}:`, downloadError);
          throw new Error(`Failed to download ${file.name}`);
        }
      })
    );

    await processImages(imageBuffers, id);

    res.json({
      message: 'Images processed successfully',
      processedFiles: files.length,
    });
  } catch (error) {
    console.error('Error processing images:', {
      error: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      error: 'Image processing failed',
      details: error.message,
    });
  }
};

export { get, getById, upload, updateCategory, procezz, removeById };
