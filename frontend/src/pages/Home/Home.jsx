import React from 'react';
import { ChefHat, Utensils, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

function App() {
  const navigate = useNavigate();

  const handleChatWithChef = () => {
    navigate('/chatbot');
  };
  return (
    <div className="cooking-universe">
      <div className="cooking-universe__ambient-layer"></div>
      <div className="cooking-universe__content">
        {/* Hero Section */}
        <section className="cooking-hero">
          <div className="cooking-hero__wrapper">
            <h1 className="cooking-hero__title">Welcome to Cooking Assistant</h1>
            <p className="cooking-hero__subtitle">Your personal AI-powered cooking companion</p>
            <button className="cooking-hero__cta" onClick={handleChatWithChef}>
      <ChefHat className="w-5 h-5 mr-2" />
      Chat with Chef
    </button>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="cooking-intro">
          <div className="cooking-intro__wrapper">
            <h2 className="cooking-intro__title">What We Do</h2>
            <p className="cooking-intro__text">
              Cooking Assistant helps you create delicious meals with ease. Whether you're a beginner or a pro, 
              our AI-powered tools will guide you step-by-step to culinary success.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="cooking-features">
          <h2 className="cooking-features__title">Our Features</h2>
          <div className="cooking-features__grid">
            <div className="cooking-feature-card">
              <ChefHat className="cooking-feature-card__icon" />
              <h3 className="cooking-feature-card__title">AI Recipe Suggestions</h3>
              <p className="cooking-feature-card__text">Get personalized recipes based on your ingredients.</p>
            </div>
            <div className="cooking-feature-card">
              <BookOpen className="cooking-feature-card__icon" />
              <h3 className="cooking-feature-card__title">Step-by-Step Guides</h3>
              <p className="cooking-feature-card__text">Follow detailed instructions for perfect results.</p>
            </div>
            <div className="cooking-feature-card">
              <Utensils className="cooking-feature-card__icon" />
              <h3 className="cooking-feature-card__title">Ingredient Tracker</h3>
              <p className="cooking-feature-card__text">Keep track of what's in your pantry.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;