import React from 'react';
import PropTypes from 'prop-types';
import './ProjectsSection.css';
import { assets } from '../assets/assets';


const ProjectsSection = ({ 
  projects = [
    {
      id: 1,
      title: "Project 02",
      description: "Lorem ipsum dolor sit amet.",
      image: assets.Eg_Design
    },
    {
      id: 2,
      title: "Project 02",
      description: "Lorem ipsum dolor sit amet.",
      image: assets.Eg_Design
    },
    {
      id: 3,
      title: "Project 02",
      description: "Lorem ipsum dolor sit amet.",
      image: assets.Eg_Design
    }
  ] 
}) => {
  return (
    <div className="projects-section">
      <div className="header">
        <div className="title">
          <span className="green">PROJ</span>ECTS
        </div>
        <button className="upload-btn">Upload</button>
      </div>
      
      <div className="projects-container">
        <div className="left-section">
          <div className="featured-project">
            <img src={projects[0].image} alt="Featured project" />
            <div className="project-info">
              <h2>{projects[0].title}</h2>
              <p>{projects[0].description}</p>
            </div>
          </div>
        </div>
        
        <div className="right-section">
          {projects.slice(1).map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
ProjectsSection.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  )
};

export default ProjectsSection;
