import React, { useEffect, useState } from 'react';
import { BarChart, Activity, FileText, Clock } from 'lucide-react';
import Navbar from '../nav&side/Navbarin';
import Sidebar from '../nav&side/Sidebar';
import './Dashboard.css';
import { fetchDashboardData } from '../../../api/project';

const Dashboard = () => {
  const [projectStats, setProjectStats] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData(setProjectStats, setRecentProjects, setLoading);
    setLoading(false);
  }, []);

  const handleViewAllClick = () => {
    setShowAllProjects(!showAllProjects);
  };

  const handleProjectClick = (projectName) => {
    localStorage.setItem('projectName', projectName);
    window.location.href = `/project/${projectName}`;
  };

  const projectsToShow = showAllProjects ? recentProjects : recentProjects.slice(0, 5);

  return (
    <div className="dashboard">
      <Navbar links={[
        { label: 'Home', href: '/' },
        { label: 'Learn', href: '/learn' },
        { label: 'VR View', href: '/view' },
        { label: 'AboutUsModel', href: '/weare' },
        { label: 'Support', href: '/support' },
      ]} />
      
      <div className="dashboard-content">
        <Sidebar />
        
        <main className="main-content">
          {/* Project Stats */}
          <div className="stats-grid">
            {projectStats.map((stat) => (
              <div key={stat.title} className="stat-card">
                <div className="stat-icon">
                  {stat.icon === 'FileText' && <FileText size={24} />}
                  {stat.icon === 'Activity' && <Activity size={24} />}
                  {stat.icon === 'Clock' && <Clock size={24} />}
                  {stat.icon === 'BarChart' && <BarChart size={24} />}
                </div>
                <div className="stat-info">
                  {loading ? <p>Loading...</p> : (
                    <>
                      <h3>{stat.title}</h3>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-trend">{stat.trend}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Projects */}
          <section className="recent-projects">
            <div className="section-header">
              <h2>Recent Projects</h2>
              {recentProjects.length > 4 && (
                <button className="view-all-btn" onClick={handleViewAllClick}>
                  {showAllProjects ? 'Show Less' : 'View All'}
                </button>
              )}
            </div>

            <div className="projects-container">
              {loading ? (
                <p>Loading projects...</p>
              ) : (
                <table className="projects-table">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Last Modified</th>
                      <th>Size</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectsToShow.map((project) => (
                      <tr key={project.id} onClick={() => handleProjectClick(project.name)} className="clickable-row">
                        <td>
                          <div className="project-name">
                            <div className="project-icon">
                              <FileText size={16} />
                            </div>
                            <span>{project.name}</span>
                          </div>
                        </td>
                        <td>{project.lastModified}</td>
                        <td>{project.size}</td>
                        <td>
                          <span className={`status ${project.status.toLowerCase()}`}>
                            {project.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;