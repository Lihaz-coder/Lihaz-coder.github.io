const OpenAI = require('openai');
const { config } = require('../server/config');

const client = new OpenAI({ apiKey: config.openAiApiKey });

function stripCodeFence(text = '') {
  return text
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
}

function parseStructuredAnalysis(rawText) {
  const cleaned = stripCodeFence(rawText);

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error('AI response could not be parsed into JSON.');
  }
}

async function analyzeImageForPrompt(dataUrl) {
  const response = await client.responses.create({
    model: config.openAiModel,
    temperature: 0.2,
    max_output_tokens: 1400,
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: [
              'You are an expert visual analyst that converts one image into one professional image-generation prompt.',
              'Never claim an image was generated.',
              'Do not invent details that are not reasonably visible.',
              'If uncertain, describe details conservatively.',
              'Return strict JSON only with these keys:',
              'subject, pose_expression, clothing_accessories, environment, lighting, camera_composition, visual_style, quality, preservation, final_image, negative_prompt.',
              'Each value must be a concise but detailed paragraph.',
              'negative_prompt must be a comma-separated list of artifacts to avoid.',
            ].join(' '),
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: 'Analyze the reference photo and return the required JSON for building one polished production-ready image-generation prompt.',
          },
          {
            type: 'input_image',
            image_url: dataUrl,
          },
        ],
      },
    ],
  });

  return parseStructuredAnalysis(response.output_text);
}

module.exports = { analyzeImageForPrompt };
