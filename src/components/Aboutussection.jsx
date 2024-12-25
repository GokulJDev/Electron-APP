import React, { useState } from 'react';
import './AboutUsSection.css'; // Ensure the CSS file includes the animations

const AboutUsSection = () => {
  const [showCards, setShowCards] = useState(false);

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

  const handleClick = () => {
    setShowCards(true); // Trigger animations
  };

  return (
    <button 
      className="about-us-section" 
      onMouseEnter={handleClick} 
    >
      <h1 className="about-us-title">ABOUT US</h1>
      <div className={`cards-container ${showCards ? "show" : ""}`}>
        {cards.map((card, index) => (
          <div key={card.title} className={`card card-${index + 1}`}>
            <div 
              className="card-background" 
              style={{ backgroundImage: `url(${card.backgroundImage})` }}
            />
            <div className="card-content">
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </button>
  );
};

export default AboutUsSection;
