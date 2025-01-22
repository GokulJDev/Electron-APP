import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance steps every 3 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="how-it-works">
      <h1 className="title animated-gradient">{title}</h1>
      
      <div className="steps-container">
        <div className="steps-content">
          {steps.map((step, index) => (
            <button 
              key={step.number}
              className={`step-card 
                         ${index === activeStep ? 'active' : ''} 
                         ${index < activeStep ? 'completed' : ''} 
                         fade-in-slide`}
              onClick={() => setActiveStep(index)}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="step-header">
                <div className={`step-number ${index === activeStep ? 'pulse' : ''}`}>
                  <span className={index <= activeStep ? 'number' : 'number-inactive'}>
                    {step.number}
                  </span>
                </div>
                <h3 className="step-title">{step.title}</h3>
              </div>
              
              <div className="step-body">
                <p className="step-description">{step.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

HowItWorks.propTypes = {
  title: PropTypes.string,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  )
};

export default HowItWorks;

