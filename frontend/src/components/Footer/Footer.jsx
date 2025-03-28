import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Using React Icons for social media
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Phone: +91 7305898078</p>
          <p>Email: veerychetty123gmail.com</p>
        </div>
        <div className="footer-section">
          <h3>Our Team</h3>
          <p>Team Name: Awesome Team</p>
          <p>Member 1: Veery Chetty.K</p>
          <p>Member 2: Naveen</p>
          <p>Member 3: Nebin</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} cookbook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;