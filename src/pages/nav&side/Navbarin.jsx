import React, { useState } from 'react';
import './Navbarin.css';
import { assets } from '../../assets/assets';
import { Search, Bell, User, Menu } from 'lucide-react';
import { authLogout } from '../../../api/auth';

const Navbarin = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

const handleLogout = async () => {
  await authLogout();
};

  return (
    <nav className="unique-navbar">
      <div className="unique-navbar-left">
        <img src={assets.logo} className="unique-logo" alt="Logo" />
        <button
          className="unique-menu-toggle"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Right Section */}
      <div className="unique-navbar-right">
        {/* Search Bar */}
        <div className="unique-search-container">
          <Search className="unique-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="unique-search-input"
          />
        </div>

        {/* Notifications */}
        <div className="unique-notifications">
          <Bell className="unique-notification-icon" size={24} />
          <span className="unique-notification-count">3</span>
        </div>

        {/* User Profile Dropdown */}
        <button
          className="unique-profile-container"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <User className="unique-profile-icon" size={24} />
          {isDropdownOpen && (
            <div className="unique-profile-dropdown">
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>
                  <button className='outbut' onClick={handleLogout} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbarin;
