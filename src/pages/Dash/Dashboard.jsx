import React from 'react';
import { BarChart, Activity, FileText, Clock } from 'lucide-react';
import Navbar from '../nav&side/Navbarin';
import Sidebar from '../nav&side/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' },
    { label: 'VR View', href: '/settings' },
    { label: 'AboutUsModel',href:'/weare'},
    { label: 'Support', href: '/support' },
  ];

  const projectStats = [
    { title: 'Total Projects', value: '24', icon: FileText, trend: '+4 this week' },
    { title: 'Active Projects', value: '12', icon: Activity, trend: '+2 this month' },
    { title: 'Time Spent', value: '47h', icon: Clock, trend: '12h this week' },
    { title: 'Project Size', value: '2.1GB', icon: BarChart, trend: '+300MB' },
  ];

  return (
    <div className="dashboard">
      <Navbar links={links} />
      
      <div className="dashboard-content">
        <Sidebar />
        
        <main className="main-content">
          <div className="stats-grid">
            {projectStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  {<stat.icon size={24} />}
                </div>
                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-trend">{stat.trend}</div>
                </div>
              </div>
            ))}
          </div>

          <section className="recent-projects">
            <div className="section-header">
              <h2>Recent Projects</h2>
              <button className="view-all-btn">View All</button>
            </div>
            
            <div className="projects-container">
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
                  <tr>
                    <td>
                      <div className="project-name">
                        <div className="project-icon">BS</div>
                        <span>Buzz Show Bed_v10</span>
                      </div>
                    </td>
                    <td>3 days ago</td>
                    <td>132.2KB</td>
                    <td><span className="status active">Active</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="project-name">
                        <div className="project-icon">IT</div>
                        <span>iPhone test</span>
                      </div>
                    </td>
                    <td>28 days ago</td>
                    <td>273KB</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="project-name">
                        <div className="project-icon">DT</div>
                        <span>Dramas For Transfer XtoCC</span>
                      </div>
                    </td>
                    <td>last month</td>
                    <td>271KB</td>
                    <td><span className="status pending">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;