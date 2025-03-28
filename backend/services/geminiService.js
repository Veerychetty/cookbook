const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRecipe = async (ingredients) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Generate a detailed step-by-step recipe using these ingredients: ${ingredients.join(', ')}. Provide clear instructions and measurements.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); // Extract text correctly
    return text;
  } catch (error) {
    console.error('Error generating recipe:', error);
    return "I'm sorry, but I couldn't generate a recipe at this moment.";
  }
};

module.exports = { generateRecipe };
