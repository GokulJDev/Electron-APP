import React, { useState, useEffect, useRef } from 'react';
import './AboutUsSection.css';
import { assets } from '../assets/assets';  // Assuming the assets are exported from a separate file

const AboutUsSection = () => {
  const [showCards, setShowCards] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const cards = [
    {
      title: '2D-to-3D Conversion',
      description: 'KAIRA converts 2D floor plans into detailed 3D models, allowing users to visualize and explore spaces realistically.',
      backgroundImage: 'https://dashboard.codeparrot.ai/api/assets/Z2QvNY6CYQNjI7-b'
    },
    {
      title: 'Customization & Experimentation',
      description: 'Users can preview layouts, experiment with furniture placement, and customize interiors, enabling effective design choices before construction.',
      backgroundImage: 'https://dashboard.codeparrot.ai/api/assets/Z2QvNY6CYQNjI7-c'
    },
    {
      title: 'Enhanced Realism & VR Integration',
      description: 'KAIRA provides lifelike visualization options with VR technology, allowing immersive experiences to improve decision-making for architects, designers, and homeowners.',
      backgroundImage: 'https://dashboard.codeparrot.ai/api/assets/Z2QvNo6CYQNjI7-d'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-us-section">
      <h1 className={`about-us-title ${showCards ? 'show' : ''}`}>
        ABOUT US
      </h1>

      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`card ${showCards ? 'show' : ''} ${activeIndex === index ? 'active' : ''}`}
            style={{ animationDelay: `${index * 200}ms` }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div 
              className="card-background"
              style={{ backgroundImage: `url(${card.backgroundImage})` }}
            />
            <div className="card-content">
              <div className="card-header">
                <span className="card-number">{(index + 1).toString().padStart(2, '0')}</span>
                <h2 className="card-title">{card.title}</h2>
              </div>
              <p className="card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Displaying the GIF video from assets */}
      <div className="video-container">
        <img src={assets.video} alt="Video" className="video-gif" />
      </div>
    </div>
  );
};

export default AboutUsSection;
