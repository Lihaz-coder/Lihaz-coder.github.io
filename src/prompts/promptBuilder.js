const DEFAULT_NEGATIVE =
  'blur, low quality, distorted anatomy, extra fingers, duplicate objects, unnatural face, oversaturated colors, artifacts, watermark, text';

function normalize(value) {
  if (!value || typeof value !== 'string') return 'Not clearly visible in the reference image.';
  return value.trim();
}

function buildFinalPrompt(analysis) {
  const subject = normalize(analysis.subject);
  const poseExpression = normalize(analysis.pose_expression);
  const clothingAccessories = normalize(analysis.clothing_accessories);
  const environment = normalize(analysis.environment);
  const lighting = normalize(analysis.lighting);
  const cameraComposition = normalize(analysis.camera_composition);
  const visualStyle = normalize(analysis.visual_style);
  const quality = normalize(analysis.quality);
  const preservation = normalize(analysis.preservation);
  const finalImage = normalize(analysis.final_image);
  const negativePrompt = normalize(analysis.negative_prompt || DEFAULT_NEGATIVE);

  const promptText = [
    'Create a highly realistic professional image based on the reference photo.',
    '',
    'SUBJECT:',
    subject,
    '',
    'POSE & EXPRESSION:',
    poseExpression,
    '',
    'CLOTHING & ACCESSORIES:',
    clothingAccessories,
    '',
    'ENVIRONMENT:',
    environment,
    '',
    'LIGHTING:',
    lighting,
    '',
    'CAMERA & COMPOSITION:',
    cameraComposition,
    '',
    'VISUAL STYLE:',
    visualStyle,
    '',
    'QUALITY:',
    quality,
    '',
    'PRESERVATION:',
    preservation,
    '',
    'FINAL IMAGE:',
    finalImage,
    '',
    'Negative prompt:',
    negativePrompt,
  ].join('\n');

  const whatsappMessage = [
    '✅ Image analyzed successfully.',
    '',
    '🎨 YOUR AI IMAGE PROMPT',
    '',
    promptText,
    '',
    '🚫 Negative Prompt:',
    negativePrompt,
    '',
    'You can copy this prompt into your preferred image-generation AI.',
  ].join('\n');

  return {
    promptText,
    whatsappMessage,
    negativePrompt,
  };
}

module.exports = { buildFinalPrompt, DEFAULT_NEGATIVE };
