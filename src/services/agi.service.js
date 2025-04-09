import axios from 'axios';

import systemPrompt from '../constants/agi-prompts.js';
async function callOpenAI(contexts) {
  const messages = [
    { role: 'system', content: systemPrompt },
    ...contexts.map((context) => ({ role: 'user', content: context })),
  ];
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o',
      messages,
      temperature: 0.2,
      stream: false,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 3000000,
    }
  );
  return response.data.choices[0].message.content;
}

function parseOpenAIResponse(rawJSON) {
  let cleaned = rawJSON.trim();
  cleaned = cleaned.replace(/^```(?:json)?\n/, '').replace(/\n```$/, '');
  try {
    return JSON.parse(cleaned);
  } catch (jsonError) {
    throw new Error(`Failed to parse JSON: ${jsonError.message}`);
  }
}

export { callOpenAI, parseOpenAIResponse };
