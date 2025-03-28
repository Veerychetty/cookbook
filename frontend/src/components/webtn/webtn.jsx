import React from "react";
import { Utensils } from "lucide-react"; // Importing the Utensils icon
import "./webtn.css"; // Import the styles

const WebBtn = () => {
  return (
    <a 
      href="https://alweighingmachine-nkraprrspp2ptzfwkxabcu.streamlit.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="web-btn"
    >
      <Utensils size={20} className="btn-icon" /> {/* Adding the icon */}
      Weigt machine
    </a>
  );
};

export default WebBtn;
