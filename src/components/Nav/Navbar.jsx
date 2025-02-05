import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import {assets} from '../../assets/assets';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("");  // Start with an empty string to avoid "HOME" being active by default
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const location = useLocation();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  // Update active menu based on the current pathname
  useEffect(() => {
    const path = location.pathname === "/" ? "HOME" : location.pathname.split('/')[1].toUpperCase();
    setActiveMenu(path);
  }, [location.pathname]);

  // Optimized handleMouseMove using useCallback
  const handleMouseMove = useCallback((event) => {
    if (event.clientY < 180) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(location.pathname === '/');
    }
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Reset active menu when on Upload page
  useEffect(() => {
    if (location.pathname === '/upload') {
      setActiveMenu("");
    }
  }, [location.pathname]);

  // Hide navbar on the /upload page
  if (location.pathname === '/upload') {
    return null;
  }

  const onLoginClick = () => {
    window.location.href = "/login";
  };

  return (
    <nav className={`navbar ${isNavbarVisible ? '' : 'hidden'}`}>
      <img src={assets.logo} alt="Brand Logo" className="navbar-logo" />
      <ul className="navbar-menu">
        {["HOME", "ABOUT", "STEPS", "PROJECTS", "CONTACT"].map((menu) => (
          <li key={menu}>
            <Link
              to={`/${menu === "HOME" ? "" : menu.toLowerCase()}`}
              className={`navbar-item ${activeMenu === menu ? "active" : ""}`}
              onClick={() => handleMenuClick(menu)}
            >
              {menu.replace("_", " ")}
            </Link>
          </li>
        ))}
      </ul>
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
