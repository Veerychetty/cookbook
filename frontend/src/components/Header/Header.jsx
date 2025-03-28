import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProfilePopup from "../profile/profile";
import "./Header.css";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  const renderProfileIcon = () => {
    if (user?.photoURL) {
      return <img src={user.photoURL} alt="Profile" className="profile-photo-header" />;
    }
    if (user?.displayName) {
      return <div className="profile-initials">{user.displayName[0].toUpperCase()}</div>;
    }
    return <div className="profile-initials">?</div>;
  };

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close menu when clicking the backdrop
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-button" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      <div className={`nav-backdrop ${isMenuOpen ? "show" : ""}`} onClick={closeMenu}></div>

      {/* Logo */}
      <div className="logo">Cookbook</div>

      {/* Navigation */}
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink 
          to="/recipes" 
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Recipes
        </NavLink>
        <NavLink 
          to="/chatbot" 
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          ChatBot
        </NavLink>
      </nav>

      {/* Search & User Section */}
      <div className="search-user">
        {/* Search Bar */}
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          <Search className="search-icon" size={20} />
        </div>

        {/* Profile Icon */}
        <div className="user-icon" onClick={() => setShowProfile(true)}>
          {renderProfileIcon()}
        </div>
      </div>

      {/* Profile Popup */}
      {showProfile && (
        <ProfilePopup 
          onClose={() => setShowProfile(false)} 
          updateUserProfile={updateUserProfile} 
        />
      )}
    </header>
  );
};

export default Header;