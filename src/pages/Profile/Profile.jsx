import React, { useState, useEffect } from 'react';
import { User, Camera, Trash2, Moon, Sun, Check } from 'lucide-react';
import './Profile.css';
import { assets } from '../../assets/assets';
import { fetchProfileDetails } from '../../../api/profile';

const Profile = () => {
  
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    taxID: '',
    country: '',
    address: '',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFormModified(true);
    }
  };

  const handleDeleteAvatar = () => {
    setSelectedImage(null);
    setFormModified(true);
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setFormModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for saving data
    setTimeout(() => {
      setSuccessMessage('Profile updated successfully!');
      setFormModified(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 500);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src={assets.logo} className="unique-logo-dash" alt="logo" />
        </div>
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-container">
            {selectedImage ? (
              <img src={selectedImage} alt="Profile" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                <User size={48} />
              </div>
            )}
          </div>
          <p className="user-name">{userData.firstName} {userData.lastName}</p>
          <div className="avatar-actions">
            <label className="upload-btn-pro">
              <Camera size={16} />
              Upload Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {selectedImage && (
              <button onClick={handleDeleteAvatar} className="delete-btn">
                <Trash2 size={16} />
                Remove
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Account Settings</h1>
          <div className="header-actions">
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="tabs">
          <button 
            onClick={() => setActiveTab('personal')} 
            className={activeTab === 'personal' ? 'active' : ''}
          >
            Personal Info
          </button>
          <button 
            onClick={() => setActiveTab('security')} 
            className={activeTab === 'security' ? 'active' : ''}
          >
            Security
          </button>
          <button 
            onClick={() => setActiveTab('preferences')} 
            className={activeTab === 'preferences' ? 'active' : ''}
          >
            Preferences
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            <Check size={16} />
            {successMessage}
          </div>
        )}

        {/* Profile Section */}
        <div className="content-card">
          {activeTab === 'personal' && (
            <div className="tab-content">
              <div className="profile-layout">
               
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                    <label>KAIRA User ID</label>
                      <input
                        type="text"
                        name="taxID"
                        value={userData.taxID}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                    <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={userData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                    <label>Mobile Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        value={userData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                      />
                    </div>

                  </div>
                  <div className="form-actions">
                    <button
                      type="submit"
                      disabled={!formModified}
                      className={formModified ? 'save-btn' : 'save-btn disabled'}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-content">
              <h3 className="section-title">Security Settings</h3>
              <div className="security-sections">
                <div className="security-section">
                  <h4>Change Password</h4>
                  <div className="password-grid">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input type="password" />
                    </div>
                    <div className="form-group empty"></div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input type="password" />
                    </div>
                  </div>
                  <div className="section-actions">
                    <button className="action-btn">
                      Update Password
                    </button>
                  </div>
                </div>
                

                
                <div className="security-section">
                  <h4>Login Sessions</h4>
                  <p className="section-description">You're currently logged in on these devices</p>
                  <div className="session-item">
                    <div className="session-info">
                      <div className="device-name">Chrome on Windows</div>
                      <div className="device-details">New York, USA · Current Session</div>
                    </div>
                    <button className="link-btn">This Device</button>
                  </div>
                  <div className="session-item">
                    <div className="session-info">
                      <div className="device-name">Safari on iPhone</div>
                      <div className="device-details">New York, USA · 2 days ago</div>
                    </div>
                    <button className="link-btn red">Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="tab-content">
              <h3 className="section-title">Preferences</h3>
              <div className="preference-sections">
                <div className="preference-section">
                  <h4>Notification Settings</h4>
                  <div className="toggle-list">
                    <div className="toggle-item">
                      <label>Email Notifications</label>
                      <div className="toggle-switch">
                        <input type="checkbox" id="email-notifications" defaultChecked />
                        <label htmlFor="email-notifications" className="toggle-label"></label>
                      </div>
                    </div>
                    <div className="toggle-item">
                      <label>SMS Notifications</label>
                      <div className="toggle-switch">
                        <input type="checkbox" id="sms-notifications" />
                        <label htmlFor="sms-notifications" className="toggle-label"></label>
                      </div>
                    </div>
                    <div className="toggle-item">
                      <label>Push Notifications</label>
                      <div className="toggle-switch">
                        <input type="checkbox" id="push-notifications" defaultChecked />
                        <label htmlFor="push-notifications" className="toggle-label"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="preference-section">
                  <h4>Privacy Settings</h4>
                  <div className="toggle-list">
                    <div className="toggle-item">
                      <label>Allow data collection for personalization</label>
                      <div className="toggle-switch">
                        <input type="checkbox" id="data-collection" defaultChecked />
                        <label htmlFor="data-collection" className="toggle-label"></label>
                      </div>
                    </div>
                    <div className="toggle-item">
                      <label>Share account activity with third parties</label>
                      <div className="toggle-switch">
                        <input type="checkbox" id="share-activity" />
                        <label htmlFor="share-activity" className="toggle-label"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="preference-section">
                  <h4>Appearance</h4>
                  <div className="appearance-options">
                    <button className="appearance-btn">System Default</button>
                    <button className={`appearance-btn ${!isDarkMode ? 'active' : ''}`}>Light Mode</button>
                    <button className={`appearance-btn ${isDarkMode ? 'active' : ''}`}>Dark Mode</button>
                  </div>
                </div>
                
                <div className="preference-actions">
                  <button className="save-btn">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;