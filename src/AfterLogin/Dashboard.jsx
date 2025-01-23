import React from 'react';
import './Dashboard.css';
import { assets } from '../assets/assets';
import { Search, User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li>Home</li>
            <li>Learn</li>
            <li>Sync Settings</li>
          </ul>
        </nav>

        <div className="project-buttons">
          <button className="primary-btn">New Project...</button>
          <button className="primary-btn">Open Project...</button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list secondary">
            <li>About Us</li>
            <li>Support</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="header-container">
          <header className="header">
          <div className="sidebar-header">
          <img src={assets.logo} alt="Brand Logo" className="navbar-logo" />
        </div>
            <div className="header-left">
              <h1>Welcome back to KAIRA.</h1>
            </div>
            <div className="header-right">
              <div className="search-container">
                <Search className="search-icon" size={20} />
                <input type="text" placeholder="Search projects..." className="search-input" />
              </div>
              <div className="profile">
                <User className="profile-icon" size={24} />
              </div>
            </div>
          </header>
        </div>
        
        <section className="recent-projects">
          <h2>Recent</h2>
          <table className="projects-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Last Opened</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Buzz Show Bed_v10</td>
                <td>3 days ago</td>
                <td>132.2KB</td>
              </tr>
              <tr>
                <td>iPhone test</td>
                <td>28 days ago</td>
                <td>273KB</td>
              </tr>
              <tr>
                <td>Dramas For Transfer XtoCC</td>
                <td>last month</td>
                <td>271KB</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;