import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectsSection.css';

const ProjectsSection = ({ projects = [
  {
    id: 1,
    customerName: "John Doe",
    title: "E-commerce Platform",
    description: "buivvvvvvvvvhbvbh hbfn",
    status: "In Progress",
    dueDate: "2024-02-15",
    image: "/api/placeholder/835/546"
  },
  {
    id: 2,
    customerName: "Jane Smith",
    title: "Mobile App Design",
    description: "iOS and Android app UI/UX design",
    status: "Completed",
    dueDate: "2024-01-30",
    image: "/api/placeholder/250/255"
  },
  {
    id: 3,
    customerName: "Alex Johnson",
    title: "Brand Redesign",
    description: "Complete corporate identity refresh",
    status: "In Progress",
    dueDate: "2024-03-10",
    image: "/api/placeholder/250/255"
  },
  {
    id: 4,
    customerName: "Sarah Williams",
    title: "Marketing Website",
    description: "Responsive website with CMS integration",
    status: "Completed",
    dueDate: "2024-01-20",
    image: "/api/placeholder/250/255"
  },
  {
    id: 5,
    customerName: "Michael Brown",
    title: "Dashboard Development",
    description: "Analytics dashboard with real-time data",
    status: "In Progress",
    dueDate: "2024-04-05",
    image: "/api/placeholder/250/255"
  },
  {
    id: 6,
    customerName: "Emily Davis",
    title: "Social Media App",
    description: "Community platform with messaging",
    status: "Completed",
    dueDate: "2024-01-15",
    image: "/api/placeholder/250/255"
  },
  {
    id: 7,
    customerName: "David Wilson",
    title: "Portfolio Website",
    description: "Personal portfolio with gallery",
    status: "In Progress",
    dueDate: "2024-03-25",
    image: "/api/placeholder/250/255"
  },
  {
    id: 8,
    customerName: "Lisa Anderson",
    title: "Educational Platform",
    description: "Online learning management system",
    status: "Completed",
    dueDate: "2024-02-01",
    image: "/api/placeholder/250/255"
  }
] }) => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status.toLowerCase() === filter;
  });

  return (
    <div className="projects-section">
      <div className="headerproj">
        <h1 className="titlep">Projects</h1>
        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({projects.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'in progress' ? 'active' : ''}`}
            onClick={() => setFilter('in progress')}
          >
            In Progress ({projects.filter(p => p.status.toLowerCase() === 'in progress').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({projects.filter(p => p.status.toLowerCase() === 'completed').length})
          </button>
          <button 
            className="filter-btn new-project-btn"
            onClick={() => alert("Add new project clicked!")}
          >
            New Project
          </button>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="customer-info">
                <div className="customer-avatar">
                  {project.customerName.charAt(0)}  {/* Display the first letter of customerName inside a circle */}
                </div>
                <span className="customer-name">{`Project ${index + 1}`}</span>  {/* Dynamic Project Title */}
              </div>
              <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-info">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-footer">
                <span className="due-date">Due: {new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProjectsSection.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  )
};

export default ProjectsSection;
