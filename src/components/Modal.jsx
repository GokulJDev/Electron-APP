import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
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
    const isLoggedIn = false; // Assume a check for whether the user is logged in (replace with actual logic)
    
    if (!isLoggedIn) {
      setErrorMessage('You need to log in first to upload.');
    } else if (selectedFiles.length > 0) {
      navigate('/login', { state: { files: selectedFiles } });
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close Button "X" */}
        <button
          className="close-modal"
          onClick={onClose}
          aria-label="Close modal"
        >
          X
        </button>

        <h2>Upload Your Floor Plan</h2>
        <p className="modal-description">
          Upload your 2D floor plan images to convert them into interactive 3D models. 
          <p>We support JPEG and PNG files.</p>
        </p>

        {/* Error Message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* File Input Section (Hidden if files are selected) */}
        {selectedFiles.length === 0 && (
          <div className="modal-upload-options">
            <input
              type="file"
              className="upload-input"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png"
            />
          </div>
        )}

        {/* Selected Files List */}
        {selectedFiles.length > 0 && (
          <ul className="file-list">
            {selectedFiles.map((file, index) => (
              <li key={file.name} className="file-item">
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
          className="upload-btn"
          onClick={handleUploadClick}
          disabled={selectedFiles.length === 0}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
