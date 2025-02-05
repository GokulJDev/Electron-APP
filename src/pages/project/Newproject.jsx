import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { X, AlertTriangle, Upload } from "lucide-react";
import "./NewProject.css";
import { projectentry, namecheck } from "../../../api/project";

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
  };
};

const NewProject = ({ onClose }) => {
  const [projectData, setProjectData] = useState({
      projectName: "",
      description: "",
      tags: "",
      image: null,
  });
  const [nameExists, setNameExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);

  // Debounced name check to optimize API calls
  const debouncedNameCheck = debounce(namecheck, 500);

  const handleChange = (e) => {
      const { id, value } = e.target;
      setProjectData((prev) => ({ ...prev, [id]: value }));

      if (id === "projectName") {
          debouncedNameCheck(value, setNameExists);
      }
  };

  const handleImageChange = (e) => {
      setProjectData({ ...projectData, image: e.target.files[0] });
  };

  const handleRemoveImage = () => {
      setProjectData({ ...projectData, image: null });
      if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (nameExists) return; // Prevent submission if name already exists

      setLoading(true);
      await projectentry(projectData);
      setProjectData({ projectName: "", description: "", tags: "", image: null });
      setLoading(false);
  };

  return (
      <dialog className="new-project-modal" aria-labelledby="modal-title" aria-modal="true">
          <div className="modal-content-new">
              <div className="modal-header-new">
                  <h2 id="modal-title-new">Create New Project</h2>
                  <button className="close-btn-new" onClick={onClose}><X size={16} /></button>
              </div>

              <form onSubmit={handleSubmit}>
                  <div className="form-group">
                      <input
                          id="projectName"
                          type="text"
                          value={projectData.projectName}
                          onChange={handleChange}
                          placeholder="Enter project name"
                      />
                      {nameExists && <div className="error-message"><AlertTriangle size={16} /> Project name already exists</div>}
                  </div>

                  {["description", "tags"].map((field) => (
                      <div className="form-group" key={field}>
                          <input
                              id={field}
                              type="text"
                              value={projectData[field]}
                              onChange={handleChange}
                              placeholder={`Enter ${field}`}
                          />
                      </div>
                  ))}

                  <div className="form-group">
                      <button
                          type="button"
                          className={`file-upload-area ${projectData.image ? "file-selected" : ""}`}
                          onClick={() => imageInputRef.current.click()}
                      >
                          {projectData.image ? (
                              <div className="file-info">
                                  <span className="file-name">{projectData.image.name}</span>
                                  <button type="button" className="remove-file-btn" onClick={handleRemoveImage}>
                                      <X size={12} />
                                  </button>
                              </div>
                          ) : (
                              <div className="upload-placeholder">
                                  <Upload size={48} />
                                  <p>Click to upload image</p>
                                  <small>Supports: JPG, PNG (max 5MB)</small>
                              </div>
                          )}
                      </button>
                  </div>

                  <div className="form-actions">
                      <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
                      <button type="submit" className="primary-btn-new" disabled={loading || nameExists}>
                          {loading ? "Creating..." : "Create Project"}
                      </button>
                  </div>
              </form>

              <input ref={imageInputRef} type="file" style={{ display: "none" }} onChange={handleImageChange} accept=".jpg,.jpeg,.png" />
          </div>
      </dialog>
  );
};

NewProject.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewProject;