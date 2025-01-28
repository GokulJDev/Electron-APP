import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Upload, FileText, Image, X, AlertTriangle, Check } from "lucide-react";
import "./NewProject.css";

const NewProject = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [file, setFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const errors = {};

    if (!projectName.trim()) {
      errors.projectName = "Project name is required";
    } else if (projectName.length < 3) {
      errors.projectName = "Project name must be at least 3 characters";
    } else if (projectName.length > 50) {
      errors.projectName = "Project name cannot exceed 50 characters";
    }

    if (!file) {
      errors.file = "Please upload a 2D plan file";
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 10 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        errors.file = "Invalid file type. Please upload JPG, PNG, or PDF";
      } else if (file.size > maxSize) {
        errors.file = "File size exceeds 10MB limit";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const processFile = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) processFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Project Name:", projectName);
      console.log("Uploaded File:", file);
      setProjectName("");
      setFile(null);
      onClose();
    }
  };

  return (
    <dialog
      className="new-project-modal"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title">Create New Project</h2>
          <button className="close-btn" onClick={onClose}>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              aria-describedby="project-name-error"
            />
            {validationErrors.projectName && (
              <div id="project-name-error" className="error-message">
                <AlertTriangle size={16} /> {validationErrors.projectName}
              </div>
            )}
          </div>

          <div className="form-group">
            <button
              type="button"
              className={`file-upload-area ${file ? "file-selected" : ""}`}
              onClick={() => fileInputRef.current.click()}
            >
              {file ? (
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <button
                    type="button"
                    className="remove-file-btn"
                    onClick={handleRemoveFile}
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <Upload size={48} />
                  <p>Click to upload</p>
                  <small>Supports: JPG, PNG, PDF (max 10MB)</small>
                </div>
              )}
            </button>
            {validationErrors.file && (
              <div id="file-upload-error" className="error-message">
                <AlertTriangle size={16} /> {validationErrors.file}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              <Check size={16} /> Create Project
            </button>
          </div>
        </form>

        {/* Hidden file input for selecting files */}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf"
        />
      </div>
    </dialog>
  );
};

NewProject.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewProject;
