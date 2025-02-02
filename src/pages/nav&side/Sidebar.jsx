import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import Uploadpage from "../project/Newproject";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null); // Reference to file input

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle the file selection when the input changes
  const handleFileSelection = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      console.log("Selected File: ", file);
      // Add any further file processing here (e.g., displaying it or uploading)
    }
  };

  // Define navigation items with their paths
  const mainNavItems = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Learn', path: '/learn' },
    { label: 'VR View', path: '/settings' }
  ];

  const secondaryNavItems = [
    { label: 'About Us', path: '/weare' },
    { label: 'Support', path: '/contact' }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="unique-nav-list">
          {mainNavItems.map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="project-buttons-side">
        <button className="primary-btn-side" onClick={openModal}>
          New Project
        </button>
        <button
          className="primary-btn-side"
          onClick={() => fileInputRef.current.click()} // Trigger file input
        >
          Open Project
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the file input
          onChange={handleFileSelection} // Handle file selection
        />
      </div>

      <nav className="sidebar-nav secondary">
        <ul className="unique-nav-list">
          {secondaryNavItems.map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      {isModalOpen && <Uploadpage onClose={closeModal} />}
    </aside>
  );
};

export default Sidebar;
