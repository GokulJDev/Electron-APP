import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProjectsSection.css';
import { assets } from '../../assets/assets'; // Adjust the path based on your file structure

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const projects = [
    {
      id: 1,
      title: "Modern Apartment Design",
      description: "2D to 3D conversion of 1200 sqft apartment with open floor plan. Features detailed texturing and lighting.",
      customerName: "John Doe",
      dueDate: "2024-02-15",
      image: assets.image_1
    },
    {
      id: 2,
      title: "Office Complex Layout",
      description: "Multi-floor office space visualization with interactive floor switching and realistic materials.",
      customerName: "Jane Smith",
      dueDate: "2024-01-30",
      image: assets.image_2
    },
    {
      id: 3,
      title: "Luxury Villa Design",
      description: "Luxury villa 3D conversion showcasing indoor-outdoor flow with detailed landscaping elements.",
      customerName: "Alex Johnson",
      dueDate: "2024-03-10",
      image: assets.image_3
    },
    {
      id: 4,
      title: "Studio Apartment",
      description: "Compact studio apartment visualization with space-saving furniture and optimal traffic flow.",
      customerName: "Sarah Williams",
      dueDate: "2024-01-20",
      image: assets.image_4
    },
    {
      id: 5,
      title: "Penthouse Suite",
      description: "High-rise penthouse with panoramic views and multi-level living spaces rendered in photorealistic 3D.",
      customerName: "Michael Brown",
      dueDate: "2024-04-05",
      image: assets.image_5
    },
    {
      id: 6,
      title: "Restaurant Floor Plan",
      description: "Commercial restaurant space with detailed seating arrangements and kitchen workflow visualization.",
      customerName: "Emily Davis",
      dueDate: "2024-01-15",
      image: assets.image_6
    }
  ];

  const handleProjectClick = (id) => {
    setSelectedProject(id); // Set the selected project ID when clicked
  };

  const handleStartProject = () => {
    navigate("/dashboard") // alert('Please login first Start a New Project.')
  };

  const handleViewDetailsClick = () => {
    alert('Please login first to view project details.');
  };

  return (
    <div className="projects-section">
      {/* Header Section */}
      <div className="projects-header">
        <div className="header-left">
          <h1 className="projects-title animated-gradient">3D Floor Plan Gallery</h1>
        </div>
        <div className="header-actions">
          <button 
            className="start-project-btn" 
            onClick={handleStartProject} // Navigate to the Dashboard on click
          >
            Start Your Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <button 
            key={project.id} 
            className={`project-card ${selectedProject === project.id ? 'project-card-clicked' : ''}`}
            onClick={() => handleProjectClick(project.id)} // Trigger the click handler
          >
            <div className="card-overlay">
              <div className="project-header">
                <div className="customer-info">
                  <div className="customer-avatar">
                    {project.customerName.charAt(0)}
                  </div>
                  <span className="customer-name">{project.customerName}</span>
                </div>
              </div>
              <div className="image-container">
                <img 
                  src={project.image} 
                  alt={`Project ${index + 1}`} 
                  className="project-image" 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = assets.hero_image;
                    e.target.classList.add('error');
                  }}
                />
              </div>
              <div className="project-info">
                <h2>{`Project ${index + 1}`}</h2>
                <p>{project.description}</p>
                <div className="project-footer">
                  <button 
                    className="view-details-btn"
                    onClick={handleViewDetailsClick} // Show login warning on click
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
