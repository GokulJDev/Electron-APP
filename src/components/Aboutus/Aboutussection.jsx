import React from 'react';
import './Aboutussection.css';
import { assets } from '../../assets/assets';
import Navbar from '../Nav/Navbar';

const AboutUsSection = () => {
  const features = [
    {
      title: '2D-to-3D Conversion',
      description: 'KAIRA converts 2D floor plans into detailed 3D models, allowing users to visualize and explore spaces realistically.',
      icon: 'cube'
    },
    {
      title: 'Customization & Experimentation',
      description: 'Users can preview layouts, experiment with furniture placement, and customize interiors, enabling effective design choices before construction.',
      icon: 'wand'
    },
    {
      title: 'Enhanced Realism & VR Integration',
      description: 'KAIRA provides lifelike visualization options with VR technology, allowing immersive experiences to improve decision-making for architects, designers, and homeowners.',
      icon: 'vr'
    }
  ];

  return (
    <section className="about-us-section">
      <Navbar />
      
      <div className="content-left">
        <h1 className="abtitle animated-gradient">ABOUT US</h1>
        <div className="video-container">
          <img 
            src={assets.video} 
            alt="KAIRA 3D Visualization Demo" 
            className="video-gif" 
          />
        </div>
      </div>
      
      <div className="content-right">
        <div className="cards-container">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="card"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="card-icon">
                {feature.icon === 'cube' && (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z" fill="#4CAF50" />
                  </svg>
                )}
                {feature.icon === 'wand' && (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2 8.6 4.5 10 7 7.5 5.6zm12 9.8L22 14l-1.4 2.5L22 19l-2.5-1.4L17 19l1.4-2.5L17 14l2.5 1.4zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5L22 2zm-7.63 5.29a1 1 0 00-1.41 0L1.29 18.96a1 1 0 000 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a1 1 0 000-1.41l-2.33-2.35z" fill="#4CAF50" />
                  </svg>
                )}
                {feature.icon === 'vr' && (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M21 9h-3.38l.38-1.5h3a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h3l.38 1.5H3V9h18v5H3V9h18zm-9 8a4 4 0 004-4 4 4 0 00-4-4 4 4 0 00-4 4 4 4 0 004 4zm0-6a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2z" fill="#4CAF50" />
                  </svg>
                )}
              </div>
              <div className="card-content">
                <h2 className="card-title">{feature.title}</h2>
                <p className="card-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;