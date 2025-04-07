// filepath: /d:/VS Code/Electron-APP/src/components/Hero/Herosection.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import Modal from './upload/Modal';
import Navbar from '../Nav/Navbar';
import LoadingScreen from './LoadingScreen'; // Import the LoadingScreen component
import './Herosection.css';

const HeroSection = ({ 
  subtitle = "With KAIRA, you can seamlessly convert your traditional 2D floor plans into realistic and interactive 3D models. Explore designs with greater precision and creativity, bringing your ideas to life."
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to control loading screen

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const handleUploadClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />} {/* Show loading screen if loading */}
      <div className={`hero ${isLoading ? 'hidden' : ''}`}> {/* Hide hero content if loading */}
        <Navbar />
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
          
          {/* Hero Image with 3D Rotating Slider */}
          <div className="hero-image-container">
            <div className="banner">
              <div className="sliderholder" style={{ '--quantity': 10 }}>
                {[...Array(10)].map((_, index) => (
                  <div className="item" key={index} style={{ '--position': index + 1 }}>
                    <img src={`/src/assets/images/green_${index + 1}.jpg`} alt="" />
                  </div>
                ))}
              </div>
              <div className="hero-image">
                <img src={assets.hero_image} alt="3D Visualization" />
              </div>
            </div>
          </div>

          {isModalVisible && <Modal onClose={handleCloseModal} />}
        </div>
      </div>
    </>
  );
};

HeroSection.propTypes = {
  subtitle: PropTypes.string,
};

export default HeroSection;