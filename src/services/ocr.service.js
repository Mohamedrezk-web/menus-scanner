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
              // Accumulate each word into the paragraph
              paragraphText += wordText;
            }

            // After finishing the paragraph, add it to the block
            blockText += paragraphText.trim() + '\n';
          }

          // After finishing the block, add it to the structured text
          structuredText += blockText.trim() + '\n\n';
        }
      }
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

export { callVisionAPIForImage, combineVisionResponses };
