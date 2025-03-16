import React, { useState } from "react";
import { Book, Brain, Paintbrush, Share2, PlusCircle, FolderOpen } from "lucide-react";
import Navbar from "../nav&side/Navbarin";
import Sidebar from "../nav&side/Sidebar";
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
      details: "To begin, you have two options:",
      note: "Note: Supported file formats: JPG, PNG, and PDF. \n Maximum file size: 50MB.",
      subSteps: [
        {
          icon: PlusCircle,
          title: "New Project",
          description: "Click the 'New Project' button to create a fresh project.",
        },
        {
          icon: FolderOpen,
          title: "Open Existing Project",
          description: "Select a project from your existing files to continue your work.",

        }
      ],
      icon: Book,
    },
    {
      number: "2",
      title: "AI Recognition and Rendering",
      description: "Automatically identifies elements in the 2D plan.",
      details: "AI algorithms analyze your 2D plan to detect walls, doors, windows, and furniture. Once you've uploaded your floor plan, our system will process it and prepare it for 3D conversion.",
      icon: Brain,
    },
    {
      number: "3",
      title: "Interactive Customization",
      description: "Customize the 3D model by adjusting layouts and furniture.",
      details: "Use our intuitive editor to change layouts, move furniture, and apply different styles. You can adjust room dimensions, change materials, and experiment with different lighting conditions.",
      icon: Paintbrush,
    },
    {
      number: "4",
      title: "Visualize and Share",
      description: "View and share the 3D model in VR.",
      details: "Preview your 3D model in VR or share it with others using a unique link. You can also export high-quality renders for presentations or marketing materials.",
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
{step.note && <p className="step-note"><strong>{step.note}</strong></p>}

                          
                          {/* Sub-steps for Step 1 */}
                          {index === 0 && step.subSteps && (
                            <div className="sub-steps-container">
                              {step.subSteps.map((subStep, subIndex) => {
                                const SubStepIcon = subStep.icon;
                                return (
                                  <div key={subIndex} className="sub-step">
                                    <div className="sub-step-header">
                                      <SubStepIcon className="sub-step-icon" size={18} />
                                      <h4 className="sub-step-title">{subStep.title}</h4>
                                    </div>
                                    <p className="sub-step-description">{subStep.description}</p>
                                    
                                  </div>
                                );
                              })}
                            </div>
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