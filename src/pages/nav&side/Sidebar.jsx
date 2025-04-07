import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import Uploadpage from "../project/Newproject";
import { vrview } from "../../../api/vr";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNavigation = (path) => {
    if (path === "/vrview") {
      vrview((status) => {
        if (status) {
          console.log("Unity VR launched successfully 🚀");
        } else {
          console.error("Failed to launch Unity VR");
        }
      });
    } else {
      navigate(path);
    }
  };

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const projectData = JSON.parse(reader.result);
          console.log("Parsed Project: ", projectData);

          // 💡 URL-safe encode name
          const encodedName = encodeURIComponent(projectData.name.toLowerCase().replace(/\s+/g, "-"));

          navigate(`/project/${encodedName}`, { state: { projectData } });
        } catch (err) {
          console.error("Invalid .kaira file 🧨", err);
        }
      };
      reader.readAsText(file);
    }
  };
  

  const mainNavItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Learn", path: "/learn" },
    { label: "VR View", path: "/vrview" }
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
      </nav>

      <div className="project-buttons-side">
        <button className="primary-btn-side" onClick={openModal}>
          New Project
        </button>
        <button
          className="primary-btn-side"
          onClick={() => fileInputRef.current.click()}
        >
          Open Project
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelection}
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
