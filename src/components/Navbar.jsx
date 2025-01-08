import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';

const Navbar = ({ onLoginClick }) => {
  const [activeMenu, setActiveMenu] = useState("HOME");
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const location = useLocation();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseMove = (event) => {
    if (event.clientY < 120) {
      setIsNavbarVisible(true);
    } else if (location.pathname !== '/') {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true); // Show navbar on homepage
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [location.pathname]);

  // Reset activeMenu for Home when on Upload page
  useEffect(() => {
    if (location.pathname === '/upload') {
      setActiveMenu(""); // Clear active state when on upload page
    }
  }, [location.pathname]);

  // Only show Navbar if the route is not /upload
  if (location.pathname === '/upload') {
    return null; // Hide navbar on Upload page
  }

  return (
    <nav className={`navbar ${isNavbarVisible ? '' : 'hidden'}`}>
      <img src={assets.logo} alt="Brand Logo" className="navbar-logo" />
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            className={`navbar-item ${activeMenu === "HOME" ? "active" : ""}`}
            onClick={() => handleMenuClick("HOME")}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`navbar-item ${activeMenu === "ABOUT" ? "active" : ""}`}
            onClick={() => handleMenuClick("ABOUT")}
          >
            ABOUT US
          </Link>
        </li>
        <li>
          <Link
            to="/steps"
            className={`navbar-item ${activeMenu === "STEPS" ? "active" : ""}`}
            onClick={() => handleMenuClick("STEPS")}
          >
            STEPS
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={`navbar-item ${activeMenu === "PROJECTS" ? "active" : ""}`}
            onClick={() => handleMenuClick("PROJECTS")}
          >
            PROJECTS
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`navbar-item ${activeMenu === "CONTACT" ? "active" : ""}`}
            onClick={() => handleMenuClick("CONTACT")}
          >
            CONTACT
          </Link>
        </li>
      </ul>
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={onLoginClick}>Login</button>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};

export default Navbar;
