const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateRecipe } = require('./services/geminiService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route to Generate Recipe
app.post('/generate-recipe', async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Ingredients must be an array" });
    }
    const recipe = await generateRecipe(ingredients);
    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
