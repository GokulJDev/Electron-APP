import React, { useState } from "react";
import PropTypes from "prop-types";
import { X, AlertTriangle, Check, Upload } from "lucide-react";
import axios from "axios";
import "./NewProject.css";

const NewProject = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const imageInputRef = React.useRef(null);

  const validateForm = () => {
    const errors = {};

    if (!projectName.trim()) {
      errors.projectName = "Project name is required";
    } else if (projectName.length < 3) {
      errors.projectName = "Project name must be at least 3 characters";
    } else if (projectName.length > 50) {
      errors.projectName = "Project name cannot exceed 50 characters";
    }

    if (image) {
      const allowedImageTypes = ["image/jpeg", "image/png"];
      const maxImageSize = 5 * 1024 * 1024;

      if (!allowedImageTypes.includes(image.type)) {
        errors.image = "Invalid image type. Please upload JPG or PNG";
      } else if (image.size > maxImageSize) {
        errors.image = "Image size exceeds 5MB limit";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) setImage(selectedImage);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setValidationErrors({});
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("name", projectName);
    formData.append("description", description);
    formData.append("tags", tags.split(",").map(tag => tag.trim()));
    if (image) formData.append("image", image);

    // Append image metadata
    if (image) {
      formData.append("imageMetadata", JSON.stringify({
        originalName: image.name,
        size: image.size,
        mimeType: image.type,
      }));
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token
      if (!token) {
        setValidationErrors({ server: "Token not found. Please log in again." });
        return;
      }
      await axios.post(
        "http://localhost:3001/projects",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Project created successfully!");
      setProjectName("");
      setImage(null);
      setDescription("");
      setTags("");
      onClose();
    } catch (error) {
      setValidationErrors({ server: error.response?.data?.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      className="new-project-modal"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="modal-content-new">
        <div className="modal-header-new">
          <h2 id="modal-title-new">Create New Project</h2>
          <button className="close-btn-new" onClick={onClose}>
            <X size={16} />
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
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              maxLength="500"
            />
          </div>

          <div className="form-group">
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags (comma separated)"
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              className={`file-upload-area ${image ? "file-selected" : ""}`}
              onClick={() => imageInputRef.current.click()}
            >
              {image ? (
                <div className="file-info">
                  <span className="file-name">{image.name}</span>
                  <button
                    type="button"
                    className="remove-file-btn"
                    onClick={handleRemoveImage}
                  >
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
            {validationErrors.image && (
              <div id="image-upload-error" className="error-message">
                <AlertTriangle size={16} /> {validationErrors.image}
              </div>
            )}
          </div>

          {validationErrors.server && (
            <div className="error-message server-error">
              <AlertTriangle size={16} /> {validationErrors.server}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              <Check size={16} /> {successMessage}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn-new" disabled={loading}>
              {loading ? "Creating..." : <>Create Project</>}
            </button>
          </div>
        </form>

        <input
          ref={imageInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept=".jpg,.jpeg,.png"
        />
      </div>
    </dialog>
  );
};

NewProject.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewProject;
