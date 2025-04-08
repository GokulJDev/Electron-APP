import React, { useState, useEffect, useCallback } from "react";
import { FileText, Calendar, HardDrive, Search, Grid, List } from "lucide-react";
import Navbar from "../nav&side/Navbarin";
import Sidebar from "../nav&side/Sidebar";
import "./Lastvr.css";
import { fetchProjects, vrview } from "../../../api/vr";

const Lastvr = () => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // State to control visible projects

  const links = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Learn", href: "/learn" },
    { label: "Support", href: "/support" },
  ];

  useEffect(() => {
    fetchProjects((projects) => {
      setRecentProjects(projects);
      setFilteredProjects(projects);
    });
  }, []);

  useEffect(() => {
    let filtered = [...recentProjects];

    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter((project) => project.status === filterStatus);
    }

    if (filterTag) {
      filtered = filtered.filter(
        (project) =>
          Array.isArray(project.tags) &&
          project.tags.some((tag) => tag.toLowerCase() === filterTag.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, filterStatus, filterTag, recentProjects]);

  const getStatusColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "status-badge-vr active";
      case "pending":
        return "status-badge-vr pending";
      case "completed":
        return "status-badge-vr completed";
      default:
        return "status-badge-vr";
    }
  };

  const handleProjectClick = useCallback((projectName) => {
    vrview(projectName);
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prevCount) =>
      prevCount === 6 ? filteredProjects.length : 6
    );
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
                          className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                          onClick={() => setViewMode("grid")}
                        >
                          <Grid size={16} />
                        </button>
                        <button
                          className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
                          onClick={() => setViewMode("list")}
                        >
                          <List size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <h3 className="section-title-vr">Your Recent Projects</h3>

                  <div className={`projects-${viewMode}-vr`}>
                    {filteredProjects.slice(0, visibleCount).map((project, index) => {
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
                                {project.favorite && <span className="favorite-icon">★</span>}
                              </div>
                              <span className={getStatusColorClass(project.status)}>{project.status}</span>
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
                            <div className="project-detail-vr">
                              <div className="detail-icon-vr">
                                <Grid size={16} />
                              </div>
                              <div className="detail-info-vr">
                                <span className="detail-label-vr">Progress</span>
                                <span className="detail-value-vr">{project.progress}%</span>
                              </div>
                            </div>

                            {viewMode === "list" && (
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
                                    This is a{" "}
                                    {project.status.toLowerCase()} project
                                    last modified on {project.lastModified}.
                                    {viewMode !== "list" &&
                                      " Click the button below to open it in VR view."}
                                  </p>
                                </div>
                                {viewMode !== "list" && (
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
                    })}
                  </div>

                  {filteredProjects.length > 6 && (
                    <button className="view-more-btn" onClick={handleViewMore}>
                      {visibleCount === 6 ? "View More" : "View Less"}
                    </button>
                  )}
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