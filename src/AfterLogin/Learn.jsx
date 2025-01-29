import React, { useState } from "react";
import { Book, Brain, Paintbrush, Share2 } from "lucide-react";
import Navbar from "./Navbarin";
import Sidebar from "./Sidebar";
import "./Learn.css";

const Learn = () => {
  const [expandedStep, setExpandedStep] = useState(null); // Tracks expanded step

  const links = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/settings" },
    { label: "Support", href: "/support" },
  ];

  const learningSteps = [
    {
      number: "1",
      title: "Upload a Floor Plan",
      description: "Upload your 2D floor plan images to convert them into interactive 3D models.",
      details: "Supported file formats: JPG, PNG, and PDF. Maximum file size: 50MB.",
      actionLabel: "Upload Floor Plan",
      action: () => alert("Upload functionality coming soon!"), // Replace with actual upload logic
      icon: Book,
    },
    {
      number: "2",
      title: "AI Recognition and Rendering",
      description: "Automatically identifies elements in the 2D plan.",
      details: "AI algorithms analyze your 2D plan to detect walls, doors, windows, and furniture.",
      icon: Brain,
    },
    {
      number: "3",
      title: "Interactive Customization",
      description: "Customize the 3D model by adjusting layouts and furniture.",
      details: "Use our intuitive editor to change layouts, move furniture, and apply different styles.",
      icon: Paintbrush,
    },
    {
      number: "4",
      title: "Visualize and Share",
      description: "View and share the 3D model in VR.",
      details: "Preview your 3D model in VR or share it with others using a unique link.",
      icon: Share2,
    },
  ];

  return (
    <div className="learn-container">
      <Navbar links={links} />

      <div className="learn-content">
        <Sidebar />

        <main className="learn-main">
          <div className="learning-card">
            <div className="learning-card-header">
              <div className="learning-header">
                <h2 className="learning-title">Learning Path</h2>
                <div className="progress-container"></div>
              </div>
            </div>

            <div className="learning-card-content">
              <div className="steps-grid-learn">
                {learningSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isExpanded = expandedStep === index;

                  return (
                    <div
                      key={index}
                      className={`step-card-learn ${isExpanded ? "active" : ""}`}
                      onClick={() =>
                        setExpandedStep(isExpanded ? null : index)
                      }
                    >
                      <div className="step-content-learn">
                        <div className="step-icon-container-learn">
                          <Icon className="step-icon-learn" />
                        </div>
                        <div className="step-info-learn">
                          <div className="step-header-learn">
                            <span className="step-number-learn">
                              Step {step.number}
                            </span>
                          </div>
                          <h3 className="step-title-learn">{step.title}</h3>
                          <p className="step-description-learn">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Expandable Section */}
                      {isExpanded && (
                        <div className="step-extra-content">
                          <p className="step-details-learn">{step.details}</p>
                          {index === 0 && ( // Only display the button for Step 1
                            <button
                              className="upload-button"
                              onClick={step.action}
                            >
                              {step.actionLabel}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Learn;
