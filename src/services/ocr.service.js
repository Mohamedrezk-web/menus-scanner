import axios from 'axios';

async function callVisionAPIForImage(file) {
  try {
    const imageContent = file.buffer.toString('base64');
    const request = {
      image: { content: imageContent },
      features: [
        { type: 'DOCUMENT_TEXT_DETECTION' },
        { type: 'LABEL_DETECTION' },
      ],
    };

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
      { requests: [request] },
      { timeout: 3000000 }
    );

    return response.data.responses[0];
  } catch (error) {
    console.error('Vision API Error:', error.response?.data || error.message);
    throw new Error('Failed to process image with Google Vision API');
  }
}

function combineVisionResponses(responses) {
  const contexts = [];

  responses.forEach((response, index) => {
    const labels = response.labelAnnotations?.map((l) => l.description) || [];

    // Build a more structured version of the text by traversing pages, blocks, paragraphs, words, etc.
    let structuredText = '';
    if (response.fullTextAnnotation?.pages) {
      for (const page of response.fullTextAnnotation.pages) {
        for (const block of page.blocks || []) {
          let blockText = '';
          for (const paragraph of block.paragraphs || []) {
            let paragraphText = '';
            for (const word of paragraph.words || []) {
              let wordText = '';
              for (const symbol of word.symbols || []) {
                wordText += symbol.text;
              }
              blockText += paragraphText.trim() + '\n';
            }
            structuredText += blockText.trim() + '\n\n';
          }
        }
      }

      const context = `Image labels: ${labels.join(
        ', '
      )}\nExtracted text (structured by paragraph):\n${structuredText}`.trim();

      visionResults.push({
        menu: menuId,
        rawResponse: response,
        labels,
        structuredText,
        context,
        processingOrder: index,
      });
    }

    const context = `
    Image labels: ${labels.join(', ')}
    Extracted text (structured by paragraph):
    ${structuredText}
    `.trim();

    contexts.push(context);
  });

  return contexts;
}

export { createVisionRequest, callVisionAPIForImage, combineVisionResponses };
