import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import Uploadpage from "../project/Newproject";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVRAlert, setShowVRAlert] = useState(false); // State to control VR alert visibility
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null); // Reference to file input

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeVRAlert = () => setShowVRAlert(false); // Close VR alert

  
  const handleNavigation = (path) => {
    if (path === "/settings") {
      setShowVRAlert(true); // Show VR alert instead of navigating
    } else {
      navigate(path);
    }
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
    { label: "Home", path: "/dashboard" },
    { label: "Learn", path: "/learn" },
    { label: "VR View", path: "/settings" }
  ];

  const secondaryNavItems = [
    { label: "About Us", path: "/weare" },
    { label: "Support", path: "/support" }
  ];

  return (
    <aside className="sidebar-dash">
      <nav className="sidebar-nav-dash">
        <ul className="unique-nav-list">
          {mainNavItems.map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* VR Alert Message Appearing Below "VR View" */}
        {showVRAlert && (
          <div className="vr-alert">
            <p>You must add your 2D plan before accessing the VR View.</p>
            <button onClick={closeVRAlert} className="cancel-btn-side">
              Cancel
            </button>
          </div>
        )}
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
          style={{ display: "none" }} // Hide the file input
          onChange={handleFileSelection} // Handle file selection
        />
      </div>

      <nav className="sidebar-nav-dash secondary">
        <ul className="unique-nav-list">
          {secondaryNavItems.map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={location.pathname === item.path ? "active" : ""}
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
