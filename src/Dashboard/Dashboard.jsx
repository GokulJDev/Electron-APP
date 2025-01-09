import React, { useState } from 'react';
import './Dashboard.css';

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
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>KAIRA Dashboard</h2>
        <nav>
          <ul>
            <li>Upload</li>
            <li>Process</li>
            <li>Preview</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Convert 2D Floor Plan to 3D</h1>
        <div className="upload-section">
          <label htmlFor="file-upload" className="file-upload-label">
            Upload 2D Floor Plan
          </label>
          <input
            type="file"
            id="file-upload"
            className="file-upload-input"
            onChange={handleFileUpload}
            accept=".jpg,.jpeg,.png,.blend"
          />
        </div>

        {selectedFile && (
          <div className="file-details">
            <p>File: {selectedFile.name}</p>
            <p>Status: {conversionStatus === 'processing' ? 'Processing...' : 'Ready'}</p>
          </div>
        )}

        {conversionStatus === 'completed' && convertedModel && (
          <div className="preview-section">
            <h2>3D Model Preview</h2>
            <model-viewer
              src={convertedModel}
              alt="3D Floor Plan"
              ar
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '500px' }}
            ></model-viewer>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
