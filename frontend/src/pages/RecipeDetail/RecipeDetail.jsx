import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./RecipeDetail.css";

// 🔑 Replace with your actual API key
const API_KEY = "AIzaSyCgP8xX_2BupPp8dU5dSZHmi4ivvXJfG1Q";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// 📌 Recipe categories with images
const categories = {
  "Cakes & Pastries": [
  { name: "Black Forest Cake", image: "/image/black-forest.jpg" },
  { name: "Red Velvet Cake", image: "/image/red.jpg" },
  { name: "Chocolate Truffle Cake", image: "/image/chocolate-truffle.jpg" },
  { name: "Pineapple Cake", image: "/image/pineapple-cake.jpg" },
  { name: "Butterscotch Cake", image: "/image/butterscotch-cake.jpg" },
  { name: "Vanilla Sponge Cake", image: "/image/vanilla-sponge.jpg" },
  { name: "Strawberry Cream Cake", image: "/image/strawberry-cream.jpg" },
  { name: "Mango Mousse Cake", image: "/image/mango-mousse.jpg" },
  { name: "Coffee Walnut Cake", image: "/image/coffee-walnut.jpg" },
  { name: "Blueberry Cheesecake", image: "/image/blueberry-cheesecake.jpg" },
  { name: "Carrot Cake", image: "/image/carrot-cake.jpg" },
  { name: "Tiramisu", image: "/image/tiramisu.jpg" },
  { name: "Chocolate Fudge Cake", image: "/image/chocolate-fudge.jpg" },
  { name: "Rainbow Cake", image: "/image/rainbow-cake.jpg" },
  { name: "Fruit Cake", image: "/image/fruit-cake.jpg" },
  { name: "Opera Cake", image: "/image/opera-cake.jpg" },
  { name: "Choco Lava Cake", image: "/image/choco-lava.jpg" },
  { name: "Eggless Vanilla Cake", image: "/image/eggless-vanilla.jpg" }
],
  "Indian Recipes": [
   
      { name: "Dosa", image: "/image/Dosa.jpg" },
      { name: "Chutney", image: "/image/Chutney.webp" },
      { name: "Kadai chicken", image: "/image/kadai chicken.jpg" }, 
      { name: "Biryani", image: "/image/Biriyani.webp" },
      { name: "Butter Chicken", image: "/image/Butter Chiken.jpg" }, 
      { name: "Samosa", image: "/image/Samosa.jpg" },
      { name: "Tandoori Chicken", image: "/image/Thandoori.jpg" },
      { name: "Palak Paneer", image: "/image/PalakPaneer.jpg" }, 
      { name: "Chicken65", image: "/image/chicken65.jpg" }, 
      { name: "Sandwech", image: "/image/sandwech.jpg" }, 
      { name: "Vada Pav", image: "/image/Vada Pav.jpg" },
      { name: "Pani Puri", image: "/image/PaniPuri.webp" },
      { name: "Kheer", image: "/image/Kheer.webp" }, 
      { name: "Chole Bhature", image: "/image/CholeBhature.jpg" }, 
      { name: "Roti", image: "/image/roti.jpg" }, 
      { name: "Gulab Jamun", image: "/image/jamoon.webp" }, 
      { name: "Masala Chai", image: "/image/Chai.jpg" }, 
      { name: "Pongal", image: "/image/Pongol.webp" }, 
      
  
  
  
  
  ],
  "Italian Recipes": [
    
      { name: "Pizza", image: "./image/Pizza.jpg" },
      { name: "Pasta", image: "./image/Pasta.jpg" },
      { name: "Lasagna", image: "./image/Lasagna.jpg" },
      { name: "Risotto", image: "./image/Risotto.jpg" },
      { name: "Bruschetta", image: "./image/Bruschetta.jpg" },
      { name: "Tiramisu", image: "./image/Tiramisu.jpg" },
      { name: "Osso Buco", image: "./image/Osso_Buco.jpg" },
      { name: "Focaccia", image: "./image/Focaccia.jpg" },
      { name: "Gnocchi", image: "./image/Gnocchi.jpg" },
      { name: "Minestrone", image: "./image/Minestrone.jpg" },
      { name: "Arancini", image: "./image/Arancini.jpg" },
      { name: "Panna Cotta", image: "./image/Panna_Cotta.jpg" },
      { name: "Caprese Salad", image: "./image/Caprese_Salad.jpg" },
      { name: "Cannoli", image: "./image/Cannoli.jpg" },
      { name: "Polenta", image: "./image/Polenta.jpg" },
      { name: "Prosciutto", image: "./image/Prosciutto.jpg" },
      { name: "Calzone", image: "./image/Calzone.jpg" },
      { name: "Affogato", image: "./image/Affogato.jpg" },
      { name: "Panettone", image: "./image/Panettone.jpg" },
      { name: "Biscotti", image: "./image/Biscotti.jpg" },
    
  ],
  "Chinese Recipes": [
    { name: "Fried Rice", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Fried+Rice" },
    { name: "Manchurian", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Manchurian" },
    { name: "Spring Rolls", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Spring+Rolls" },
    { name: "Dim Sum", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Dim+Sum" },
    { name: "Kung Pao Chicken", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Kung+Pao+Chicken" },
    { name: "Hot and Sour Soup", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Hot+and+Sour+Soup" },
    { name: "Peking Duck", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Peking+Duck" },
    { name: "Wonton Soup", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Wonton+Soup" },
    { name: "Mapo Tofu", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Mapo+Tofu" },
    { name: "Chow Mein", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Chow+Mein" },
    { name: "Xiaolongbao", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Xiaolongbao" },
    { name: "Char Siu", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Char+Siu" },
    { name: "Zongzi", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Zongzi" },
    { name: "Dan Dan Noodles", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Dan+Dan+Noodles" },
    { name: "Egg Tarts", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Egg+Tarts" },
    { name: "Baozi", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Baozi" },
    { name: "Ma Po Tofu", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Ma+Po+Tofu" },
    { name: "Congee", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Congee" },
    { name: "Mooncake", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Mooncake" },
    { name: "Scallion Pancakes", image: "https://placehold.co/200x140/EFEFEF/AAA?text=Scallion+Pancakes" },
  ],
};

// 📌 Recipe Card Component
const RecipeCard = ({ recipe, image, onClick }) => (
  <div className="recipe-card" onClick={onClick}>
    <img src={image} alt={recipe} className="recipe-image" />
    <h3 className="recipe-title">{recipe}</h3>
    <button className="view-button">View Recipe</button>
  </div>
);

const RecipeApp = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Fetch Recipe Details from Gemini API
  const fetchRecipe = async (recipeName) => {
    setLoading(true);
    setSelectedRecipe(recipeName);
    setShowPopup(true);

    try {
      const response = await axios.post(API_URL, {
        contents: [{ role: "user", parts: [{ text: `Give me a detailed recipe for ${recipeName}` }] }],
      });

      const recipeText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No recipe found.";
      setRecipeDetails(recipeText);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipeDetails("Failed to fetch recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Recipe Suggestions</h1>

      {/* 📌 Recipe Categories */}
      <div className="categories">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="card-container">
              {categories[category].map(({ name, image }) => (
                <RecipeCard key={name} recipe={name} image={image} onClick={() => fetchRecipe(name)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 📌 Popup for Recipe Details */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-button" onClick={() => setShowPopup(false)}>&times;</span>
            <h2>{selectedRecipe}</h2>
            {loading ? <p>Loading...</p> : <ReactMarkdown>{recipeDetails}</ReactMarkdown>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeApp;
