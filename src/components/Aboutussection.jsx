import React, { useState } from 'react';
import './AboutUsSection.css'; // Ensure the CSS file includes the animations

const AboutUsSection = () => {
  const [showCards, setShowCards] = useState(false);

  const cards = [
    {
      title: '2D-to-3D Conversion',
      description: 'KAIRA converts 2D floor plans into detailed 3D models, allowing users to visualize and explore spaces realistically.',
      backgroundImage: 'https://static.wixstatic.com/media/602ad4_c999a3bec2974971a8584d83f08eb247~mv2.jpg/v1/fill/w_824,h_466,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3D%20Plan%202.jpg'
    },
    {
      title: 'Customization & Experimentation',
      description: 'Users can preview layouts, experiment with furniture placement, and customize interiors, enabling effective design choices before construction.',
      backgroundImage: 'https://www.lakdi.com/cdn/shop/articles/Drawing_Room_Design_Ideas.webp?v=1733207190'
    },
    {
      title: 'Enhanced Realism & VR Integration',
      description: 'KAIRA provides lifelike visualization options with VR technology, allowing immersive experiences to improve decision-making for architects, designers, and homeowners.',
      backgroundImage: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Virtual_Reality_1.jpg'
    }
  ];

  const handleClick = () => {
    setShowCards(true); // Trigger animations
  };

  return (
    <button 
      className="about-us-section" 
      onMouseEnter={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
    >
      <h1 className="about-us-title">About Us</h1>
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
