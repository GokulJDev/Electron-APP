import React, { useState } from "react";
import "./Sidebar.css";
import Uploadpage from "./Newproject"; // Modal component

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <aside className="sidebar">
      {/* Navigation links */}
      <nav className="sidebar-nav">
        <ul className="unique-nav-list">
          <li>Home</li>
          <li>Learn</li>
          <li>Sync Settings</li>
        </ul>
      </nav>

      {/* Project buttons */}
      <div className="project-buttons">
        <button className="primary-btn" onClick={openModal}>
          New Project
        </button>
        <button className="primary-btn">Open Project</button>
      </div>

      {/* Secondary navigation */}
      <nav className="sidebar-nav secondary">
        <ul className="unique-nav-list">
          <li>About Us</li>
          <li>Support</li>
        </ul>
      </nav>

      {/* Modal rendering */}
      {isModalOpen && <Uploadpage onClose={closeModal} />}
    </aside>
  );
};

export default Sidebar;
