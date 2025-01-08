import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = ({ onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  // Remove a file from the list
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
  };

  // Handle Upload Button Click
  const handleUploadClick = () => {
    if (selectedFiles.length > 0) {
      navigate('/login', { state: { files: selectedFiles } });
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close Button "X" */}
        <span className="close-modal" onClick={onClose}>×</span>

        <h2>Upload Your Floor Plan</h2>
        <p className="modal-description">
          Upload your 2D floor plan images to convert them into interactive 3D models. 
          <p>We support JPEG and Blend files.</p>
        </p>

        {/* File Input Section (Hidden if files are selected) */}
        {selectedFiles.length === 0 && (
          <div className="modal-upload-options">
            <input
              type="file"
              className="upload-input"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.blend"
            />
          </div>
        )}

        {/* Selected Files List */}
        {selectedFiles.length > 0 && (
          <ul className="file-list">
            {selectedFiles.map((file, index) => (
              <li key={index} className="file-item">
                {file.name}
                <button
                  className="remove-file-btn"
                  onClick={() => handleRemoveFile(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Upload Button */}
        <button
          className="upload-btn-model"
          onClick={handleUploadClick}
          disabled={selectedFiles.length === 0}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Modal;
