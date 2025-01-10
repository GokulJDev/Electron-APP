import React, { useState } from 'react';
import './Dashboard.css';
import { assets } from '../assets/assets';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversionStatus, setConversionStatus] = useState('idle'); // 'idle', 'processing', 'completed'
  const [convertedModel, setConvertedModel] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setConversionStatus('processing');
      // Simulate conversion process
      setTimeout(() => {
        setConvertedModel('path/to/3d-model.gltf'); // Replace with actual 3D model path
        setConversionStatus('completed');
      }, 5000); // Simulate 5 seconds for conversion
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-navigation-panel">
        <img src={assets.logo} alt="Brand Logo" className="navbar-logo" />
        <nav className="navigation-links-container">
          <ul className="navigation-link-list">
            <li className="navigation-link-item">My Project</li>
            <li className="navigation-link-item">Steps</li>
            <li className="navigation-link-item">Setting</li>
          </ul>
        </nav>

        {/* About Us and Help & Support at the bottom */}
        <div className="bottom-links">
          <ul className="navigation-link-list">
            <li className="navigation-link-item">About Us</li>
            <li className="navigation-link-item">Help & Support</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main-panel">
        <div className="dashboard-project-grid">
          {/* Upload Tile */}
          <div className="dashboard-upload-card">
            <label htmlFor="file-upload" className="upload-file-label">
              Upload 2D Floor Plan
            </label>
            <input
              type="file"
              id="file-upload"
              className="upload-file-input"
              onChange={handleFileUpload}
              accept=".jpg,.jpeg,.png,.blend"
            />
          </div>

          {/* File Details Tile */}
          {selectedFile && (
            <div className="dashboard-file-details-card">
              <p>File: {selectedFile.name}</p>
              <p>
                Status: {conversionStatus === 'processing' ? 'Processing...' : 'Ready'}
              </p>
            </div>
          )}

          {/* Model Preview Tile */}
          {conversionStatus === 'completed' && convertedModel && (
            <div className="dashboard-preview-card">
              <h2>3D Model Preview</h2>
              <model-viewer
                src={convertedModel}
                alt="3D Floor Plan"
                ar
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '150px' }}
              ></model-viewer>
            </div>
          )}

          {/* Placeholder Tiles */}
          <div className="dashboard-placeholder-card"></div>
          <div className="dashboard-placeholder-card"></div>

          {/* Profile Card */}
          <div className="dashboard-profile-card">
            <div className="profile-avatar-circle">N</div>
            <p className="profile-user-name">Nandana</p>
            <a className="profile-info-link" href="#">
              Fill my profile information
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
