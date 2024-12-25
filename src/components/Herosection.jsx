import React from 'react';
import './HeroSection.css';
import { assets } from '../assets/assets';

const HeroSection = ({ 
  title = "KAIRA",
  subtitle = "TURN YOUR 2D FLOOR PLANS INTO INTERACTIVE 3D VISUALIZATIONS"
}) => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <h2 className="hero-subtitle">{subtitle}</h2>
        <button className="upload-btn">Upload</button>
      </div>
      <div className="hero-image">
        
      </div><img src={assets.hero_image} alt="3D Visualization" /> 
    </div>
  );
};

export default HeroSection;

