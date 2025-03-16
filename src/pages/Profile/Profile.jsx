import React, { useState, useEffect } from 'react';
import { User, Camera, Trash2, ChevronRight, Upload, Download, Cog, Layers, Monitor, Home, Settings, LogOut, Moon, Sun, Check } from 'lucide-react';
import './Profile.css';
import { assets } from '../../assets/assets';

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    projectName: 'My Home Renovation',
    floorDimensions: '12m x 10m',
    preferredScale: '1:50',
    outputFormat: 'OBJ',
    renderQuality: 'High',
    texturePreference: 'Realistic',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFloorplan, setSelectedFloorplan] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('conversion');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [conversionProgress, setConversionProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFormModified(true);
    }
  };

  const handleFloorplanUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFloorplan(fileUrl);
      setFormModified(true);
      setSuccessMessage('Floorplan uploaded successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleDeleteFloorplan = () => {
    setSelectedFloorplan(null);
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
      setSuccessMessage('Settings updated successfully!');
      setFormModified(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 500);
  };

  const handleConversion = () => {
    if (!selectedFloorplan) {
      setSuccessMessage('Please upload a floorplan first');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return;
    }
    
    setIsConverting(true);
    setConversionProgress(0);
    
    // Simulate conversion process
    const interval = setInterval(() => {
      setConversionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setSuccessMessage('Conversion completed successfully!');
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
          return 100;
        }
        return prev + 10;
      });
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
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Floor 2D to 3D Conversion</h1>
          <div className="header-actions">
            <button 
              onClick={toggleDarkMode} 
              className="theme-toggle"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="tabs">
          <button 
            onClick={() => setActiveTab('conversion')} 
            className={activeTab === 'conversion' ? 'active' : ''}
          >
            Conversion Tool
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={activeTab === 'settings' ? 'active' : ''}
          >
            Conversion Settings
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={activeTab === 'history' ? 'active' : ''}
          >
            Conversion History
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            <Check size={16} />
            {successMessage}
          </div>
        )}

        {/* Content Section */}
        <div className="content-card">
          {activeTab === 'conversion' && (
            <div className="tab-content">
              <div className="conversion-layout">
                {/* Floorplan Upload Section */}
                <div className="floorplan-section">
                  <h3 className="section-title">Upload Floorplan</h3>
                  <div className="floorplan-upload-area">
                    {selectedFloorplan ? (
                      <div className="floorplan-preview">
                        <img src={selectedFloorplan} alt="Floorplan" className="floorplan-image" />
                        <div className="floorplan-actions">
                          <button onClick={handleDeleteFloorplan} className="delete-btn">
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <Layers size={48} />
                        <p>Drag and drop your 2D floorplan here</p>
                        <p className="upload-subtitle">Supports JPG, PNG, PDF (max 20MB)</p>
                        <label className="upload-btn">
                          <Upload size={16} />
                          Browse Files
                          <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFloorplanUpload} className="hidden" />
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {selectedFloorplan && (
                    <div className="conversion-actions">
                      <button 
                        onClick={handleConversion} 
                        disabled={isConverting} 
                        className={`convert-btn ${isConverting ? 'disabled' : ''}`}
                      >
                        Convert to 3D
                      </button>
                      
                      {isConverting && (
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${conversionProgress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{conversionProgress}%</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-content">
              <h3 className="section-title">Conversion Settings</h3>
              
              {/* Form Section */}
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      name="projectName"
                      value={userData.projectName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Floor Dimensions</label>
                    <input
                      type="text"
                      name="floorDimensions"
                      value={userData.floorDimensions}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Scale</label>
                    <select
                      name="preferredScale"
                      value={userData.preferredScale}
                      onChange={handleInputChange}
                    >
                      <option value="1:50">1:50</option>
                      <option value="1:100">1:100</option>
                      <option value="1:200">1:200</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Output Format</label>
                    <select
                      name="outputFormat"
                      value={userData.outputFormat}
                      onChange={handleInputChange}
                    >
                      <option value="OBJ">OBJ</option>
                      <option value="FBX">FBX</option>
                      <option value="GLTF">GLTF/GLB</option>
                      <option value="DAE">DAE (Collada)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Render Quality</label>
                    <select
                      name="renderQuality"
                      value={userData.renderQuality}
                      onChange={handleInputChange}
                    >
                      <option value="Low">Low (Faster)</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High (Detailed)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Texture Preference</label>
                    <select
                      name="texturePreference"
                      value={userData.texturePreference}
                      onChange={handleInputChange}
                    >
                      <option value="Basic">Basic</option>
                      <option value="Realistic">Realistic</option>
                      <option value="Stylized">Stylized</option>
                      <option value="None">No Textures</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Additional Notes</label>
                    <textarea
                      name="notes"
                      rows="3"
                      placeholder="Any special requirements for your conversion..."
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    type="submit"
                    disabled={!formModified}
                    className={formModified ? 'save-btn' : 'save-btn disabled'}
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="tab-content">
              <h3 className="section-title">Conversion History</h3>
              {/* Conversion History Table */}
              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Project Name</th>
                      <th>Input File</th>
                      <th>Output Format</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mar 15, 2025</td>
                      <td>My Home Renovation</td>
                      <td>home_floorplan.jpg</td>
                      <td>OBJ</td>
                      <td><span className="status-complete">Complete</span></td>
                      <td>
                        <button className="action-link">
                          <Download size={14} />
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Mar 10, 2025</td>
                      <td>Office Space</td>
                      <td>office_layout.pdf</td>
                      <td>FBX</td>
                      <td><span className="status-complete">Complete</span></td>
                      <td>
                        <button className="action-link">
                          <Download size={14} />
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Mar 5, 2025</td>
                      <td>Kitchen Redesign</td>
                      <td>kitchen_plan.png</td>
                      <td>GLTF</td>
                      <td><span className="status-complete">Complete</span></td>
                      <td>
                        <button className="action-link">
                          <Download size={14} />
                          Download
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;