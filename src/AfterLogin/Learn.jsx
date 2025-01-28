import React, { useState } from 'react';
import { Book, Brain, Paintbrush, Share2 } from 'lucide-react';
import Navbar from './Navbarin';
import Sidebar from './Sidebar';
import './Learn.css';

const Learn = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/settings' },
    { label: 'Support', href: '/support' },
  ];

  const learningStats = [
 
  ];

  const learningSteps = [
    {
      number: "1",
      title: "Upload a Floor Plan",
      description: "Upload your 2D floor plan images to convert them into interactive 3D models.",
      lastActivity: "2 hours ago",
      size: "15.2MB",
      status: "completed"
    },
    {
      number: "2",
      title: "AI Recognition and Rendering",
      description: "Automatically identifies elements in the 2D plan.",
      lastActivity: "Pending",
      size: "N/A",
      status: "pending"
    },
    {
      number: "3",
      title: "Interactive Customization",
      description: "Customize the 3D model by adjusting layouts and furniture.",
      lastActivity: "Not started",
      size: "N/A",
      status: "pending"
    },
    {
      number: "4",
      title: "Visualize and Share",
      description: "View and share the 3D model in VR.",
      lastActivity: "Not started",
      size: "N/A",
      status: "pending"
    }
  ];

  return (
    <div className="dashboard">
      <Navbar links={links} />
      
      <div className="dashboard-content">
        <Sidebar />
        
        <main className="main-content">
          <div className="stats-grid">
            {learningStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  {<stat.icon size={24} />}
                </div>
                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-trend ${stat.status}`}>{stat.trend}</div>
                </div>
              </div>
            ))}
          </div>

          <section className="learning-steps">
            <div className="section-header">
              <h2>Learning Steps</h2>
              <div className="progress-tracker">
                <div className="progress-bar-background">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${(currentStep / (learningSteps.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="steps-container">
              <table className="steps-table">
                <tbody>
                  {learningSteps.map((step, index) => (
                    <tr 
                      key={index}
                      className={index === currentStep ? 'active-step' : ''}
                      onClick={() => setCurrentStep(index)}
                    >
                      <td>
                        <div className="step-info">
                          <div className="step-number">{step.number}</div>
                          <div className="step-details">
                            <h4>{step.title}</h4>
                            <p>{step.description}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Learn;