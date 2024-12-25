import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../assets/assets';

const Navbar = () => {

  const [menu, setMenu] = useState("HOME");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
      <ul className='navbar-menu'>
        <li onClick={() => setMenu("HOME")} className={menu === "HOME" ? "active" : ""}>HOME</li>
        <li onClick={() => setMenu("ABOUT")} className={menu === "ABOUT" ? "active" : ""}>ABOUT</li>
        <li onClick={() => setMenu("STEPS")} className={menu === "STEPS" ? "active" : ""}>STEPS</li>
        <li onClick={() => setMenu("PROJECTS")} className={menu === "PROJECTS" ? "active" : ""}>PROJECTS</li>
        <li onClick={() => setMenu("CONTACT")} className={menu === "CONTACT" ? "active" : ""}>CONTACT</li>
      </ul>
      <div className="navbar-buttons">
        <button className='navbar-button'>Upload</button>
        <button className='navbar-button'>Login</button>
      </div>
    </div>
  );
};

export default Navbar;
