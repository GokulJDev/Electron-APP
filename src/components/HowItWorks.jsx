import React from 'react';
import './HowItWorks.css';

const HowItWorks = ({
  title = "How It Works",
  steps = [
    {
      number: "1",
      title: "Upload a Floor Plan",
      description: "Upload your 2D floor plan images to convert them into interactive 3D models. We support JPEG and blend files."
    },
    {
      number: "2", 
      title: "AI Recognition and Rendering",
      description: "Automatically identifies elements like walls, doors, and windows in the 2D plan, then renders them into a 3D model."
    },
    {
      number: "3",
      title: "Interactive Customization", 
      description: "Users can customize the 3D model by adjusting layouts, furniture, and design elements to suit their preferences."
    },
    {
      number: "4",
      title: "Visualize and Share",
      description: "Users can view the 3D model in a realistic, immersive view with VR and share it with clients for feedback."
    }
  ]
}) => {
  return (
    <div className="how-it-works">
      <h1 className="title">{title}</h1>
      
      <div className="steps-container">
        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">
                <img src={`http://cp.asset/ellipse-${step.number}.png`} alt={`Step ${step.number}`} />
                <span>{step.number}</span>
              </div>
              {index < steps.length - 1 && <div className="connector" />}
            </div>
          ))}
        </div>

        <div className="step-titles">
          {steps.map((step, index) => (
            <div key={index} className="step-title">
              {step.title}
            </div>
          ))}
        </div>

        <div className="step-descriptions">
          {steps.map((step, index) => (
            <div key={index} className="step-description">
              {step.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

