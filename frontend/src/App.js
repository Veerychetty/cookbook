import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // Import Helmet
import Home from "./pages/Home/Home.jsx";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail.jsx";
import Chatbot from "./pages/chatbot/chatbot.jsx";
import Header from "./components/Header/Header.jsx";
import Webtn from "./components/webtn/webtn.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Default SEO fallback (optional)
const DEFAULT_TITLE = "Cook Book";

function App() {
  return (
    <HelmetProvider> {/* Wrap everything with HelmetProvider */}
      <Router>
        {/* Default title for all pages (fallback) */}
        <Helmet>
          <title>{DEFAULT_TITLE}</title>
          <meta name="description" content="AI-powered cooking assistant" />
        </Helmet>

        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Helmet>
                  <title>{DEFAULT_TITLE}</title>
                </Helmet>
                <Home />
              </>
            } 
          />
          <Route 
            path="/recipes" 
            element={
              <>
                <Helmet>
                  <title>{DEFAULT_TITLE}</title>
                </Helmet>
                <RecipeDetail />
              </>
            } 
          />
          <Route 
            path="/chatbot" 
            element={
              <>
                <Helmet>
                  <title>{DEFAULT_TITLE}</title>
                </Helmet>
                <Chatbot />
              </>
            } 
          />
        </Routes>
        <Webtn />
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;