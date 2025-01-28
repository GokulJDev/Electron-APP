import React from 'react';
import Navbar from './Navbarin'; // Ensure this matches the file name
import './Dashboard.css';
import { assets } from '../assets/assets';
import Sidebar from './Sidebar'; // Import Sidebar component

const Dashboard = () => {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' },
    { label: 'Sync Settings', href: '/settings' },
    { label: 'Support', href: '/support' },
  ];

  return (
    <div className="dashboard">
      <Navbar links={links} brandLogo={assets.logo} />

      <div className="mct">
        <Sidebar /> {/* Render Sidebar component here */}

        <main className="main-content">
          <section className="recent-projects">
            <h2>Recent Projects</h2>
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
    </div>
  );
};

export default Dashboard;
