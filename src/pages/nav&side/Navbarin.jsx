import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbarin.css';
import { assets } from '../../assets/assets';
import { Search, Bell, User, Menu, LogOut, Settings } from 'lucide-react';
import { authLogout } from '../../../api/auth';

const Navbarin = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  // Sample user data - replace with actual user data from your auth context/state
  const user = {
    name: "John Doe",
    initials: "JD",
    avatar: null // Set to user's avatar URL if available
  };

  const handleLogout = async () => {
    await authLogout();
    navigate('/login');
  };

  const handleNavigateToAccount = () => {
    navigate('/profile');
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`unique-navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="unique-navbar-left">
        <img
          src={assets.logo}
          className="unique-logo"
          alt="Logo"
          onClick={() => navigate('/')}
        />
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
          <input
            type="text"
            placeholder="Search..."
            className="unique-search-input"
          />
          <Search className="unique-search-icon" size={20} />
        </div>

        {/* Notifications */}
        <div className="unique-notifications">
          <Bell className="unique-notification-icon" size={24} />
          <span className="unique-notification-count">3</span>
        </div>

        {/* User Profile Dropdown */}
        <div className={`unique-profile-container ${isDropdownOpen ? 'active' : ''}`}>
          <User
            className="unique-profile-icon"
            size={24}
            onClick={toggleDropdown}
          />
          
          {isDropdownOpen && <div className="dropdown-overlay" onClick={toggleDropdown}></div>}
          
          {isDropdownOpen && (
            <div className="unique-profile-dropdown">
              {/* User Info Section */}
              <div className="profile-dropdown-user">
                <div className="profile-dropdown-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    user.initials
                  )}
                </div>
                <div className="profile-dropdown-info">
                  <div className="profile-name">{user.name}</div>
                </div>
              </div>
              
              {/* Menu Options */}
              <ul>
                <li onClick={handleNavigateToAccount}>
                  <Settings size={16} />
                  Account Settings
                </li>
                <li>
                  <LogOut size={16} />
                  <button
                    className='outbut'
                    onClick={handleLogout}
                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbarin;