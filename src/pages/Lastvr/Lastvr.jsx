import React, { useState, useEffect } from "react";
import { FileText, Calendar, HardDrive, FolderOpen, Search, Grid, List } from "lucide-react";
import Navbar from "../nav&side/Navbarin";
import Sidebar from "../nav&side/Sidebar";
import "./Lastvr.css";

const Lastvr = () => {
  // Enhanced static data for recent projects
  const staticProjects = [
    {
      id: 1,
      name: "Office Tour VR",
      status: "Active",
      lastModified: "2025-03-15",
      size: "245 MB",
      progress: 65,
      tags: ["Tour", "Office", "Commercial"],
      favorite: true
    },
    {
      id: 2,
      name: "Product Showcase",
      status: "Completed",
      lastModified: "2025-02-28",
      size: "185 MB",
      progress: 100,
      tags: ["Product", "Marketing"],
      favorite: false
    },
    {
      id: 3,
      name: "Training Simulation",
      status: "Pending",
      lastModified: "2025-04-01",
      size: "320 MB",
      progress: 30,
      tags: ["Training", "Education"],
      favorite: true
    },
    {
      id: 4,
      name: "Architectural Walkthrough",
      status: "Active",
      lastModified: "2025-03-25",
      size: "410 MB",
      progress: 75,
      tags: ["Architecture", "Real Estate"],
      favorite: false
    }
  ];

  const [recentProjects, setRecentProjects] = useState(staticProjects);
  const [expandedProject, setExpandedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const links = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Learn", href: "/learn" },
    { label: "Support", href: "/support" },
  ];

  // Handle project open
  const handleProjectClick = (projectName) => {
    localStorage.setItem('projectName', projectName);
    window.location.href = `/project/${projectName}`;
  };

  // Handle toggling favorite status
  const toggleFavorite = (e, projectId) => {
    e.stopPropagation();
    setRecentProjects(projects => 
      projects.map(project => 
        project.id === projectId ? {...project, favorite: !project.favorite} : project
      )
    );
  };

  // Filter projects based on search term, status and tag
  useEffect(() => {
    let filteredProjects = staticProjects;
    
    if (searchTerm) {
      filteredProjects = filteredProjects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus) {
      filteredProjects = filteredProjects.filter(project => 
        project.status === filterStatus
      );
    }
    
    if (filterTag) {
      filteredProjects = filteredProjects.filter(project => 
        project.tags.some(tag => tag.toLowerCase() === filterTag.toLowerCase())
      );
    }
    
    setRecentProjects(filteredProjects);
  }, [searchTerm, filterStatus, filterTag]);

  // Get all unique tags from projects
  const getAllTags = () => {
    const tags = new Set();
    staticProjects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  // Get status color class
  const getStatusColorClass = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'status-badge-vr active';
      case 'pending': return 'status-badge-vr pending';
      case 'completed': return 'status-badge-vr completed';
      default: return 'status-badge-vr';
    }
  };

  return (
    <div className="lastvr-container">
      <Navbar links={links} />

      <div className="lastvr-content">
        <Sidebar />

        <main className="lastvr-main">
          <div className="lastvr-card">
            <div className="lastvr-card-header">
              <div className="lastvr-header">
                <h2 className="lastvr-title">VR Project Viewer</h2>
              </div>
            </div>

            <div className="lastvr-card-content">
              <div className="projects-section-vr">
                <div className="projects-controls">
                  {/* Search and filter row */}
                  <div className="search-filter-row">
                    <div className="search-box">
                      <Search size={16} />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />
                    </div>
                    
                    <div className="filters">
                      <div className="view-toggles">
                        <button 
                          className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                          onClick={() => setViewMode('grid')}
                        >
                          <Grid size={16} />
                        </button>
                        <button 
                          className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                          onClick={() => setViewMode('list')}
                        >
                          <List size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="section-title-vr">Your Recent Projects</h3>
                  
                  {/* Projects grid or list */}
                  <div className={`projects-${viewMode}-vr`}>
                    {recentProjects.length > 0 ? (
                      recentProjects.map((project, index) => {
                        const isExpanded = expandedProject === index;
                        
                        return (
                          <div
                            key={index}
                            className={`project-card-vr ${isExpanded ? "expanded" : ""} ${viewMode}`}
                            onClick={() => setExpandedProject(isExpanded ? null : index)}
                          >
                            <div className="project-header-vr">
                              <div className="project-icon-container-vr">
                                <FileText size={30} />
                              </div>
                              <div className="project-title-container-vr">
                                <div className="title-favorite-container">
                                  <h3 className="project-title-vr">{project.name}</h3>
                                </div>
                                <span className={getStatusColorClass(project.status)}>
                                  {project.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="project-content-vr">              
                              <div className="project-detail-vr">
                                <div className="detail-icon-vr">
                                  <Calendar size={16} />
                                </div>
                                <div className="detail-info-vr">
                                  <span className="detail-label-vr">Last Modified</span>
                                  <span className="detail-value-vr">{project.lastModified}</span>
                                </div>
                              </div>  
                              <div className="project-detail-vr">
                                <div className="detail-icon-vr">
                                  <HardDrive size={16} />
                                </div>
                                <div className="detail-info-vr">
                                  <span className="detail-label-vr">Size</span>
                                  <span className="detail-value-vr">{project.size}</span>
                                </div>
                              </div>
                              
                              {/* Open in VR View button - Now shows in all views, right after size */}
                              {viewMode === 'list' && (
                                <div className="project-detail-vr open-vr-button-container">
                                  <button 
                                    className="open-vr-btn" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleProjectClick(project.name);
                                    }}
                                  >
                                    Open in VR View
                                  </button>
                                </div>
                              )}
                              
                              {isExpanded && (
                                <div className="expanded-content">
                                  <div className="project-description-vr">
                                  <p>
                                    This is a {project.status.toLowerCase()} project last modified on {project.lastModified}.
                                    {viewMode !== 'list' && "Click the button below to open it in VR view."}
                                  </p>
                                  </div>
                                  {viewMode !== 'list' && (
                                    <button 
                                      className="open-vr-btn" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleProjectClick(project.name);
                                      }}
                                    >
                                      Open in VR View
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-projects-message">
                        No projects found with the current filters.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Lastvr;