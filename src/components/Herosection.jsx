import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import Modal from './Modal';  // Import the Modal component
import './HeroSection.css';

const HeroSection = ({ 
  subtitle = "With KAIRA, you can seamlessly convert your traditional 2D floor plans into realistic and interactive 3D models. Explore designs with greater precision and creativity, bringing your ideas to life."
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show Modal
  const handleUploadClick = () => {
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">Kinetic</span>
            <span className="hero-title-line">Architectural</span>
            <span className="interactive-render">Interactive Rendering</span>
            <span className="hero-title-line">Application</span>
          </h1>
          <h2 className="hero-subtitle">{subtitle}</h2>
          <button className="upload-btn" onClick={handleUploadClick}>
            Upload
          </button>
        </div>
        <div className="hero-image">
          <img src={assets.hero_image} alt="3D Visualization" />
        </div>

      {isModalVisible && <Modal onClose={handleCloseModal} />}
    </div>
    </div>
  );
};
HeroSection.propTypes = {
  subtitle: PropTypes.string,
};

export default HeroSection;

