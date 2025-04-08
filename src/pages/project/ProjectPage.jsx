import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { X, AlertTriangle, Calendar, FileText, User} from "lucide-react";
import { createBlenderProject, getDetails, updateProjectDetails } from "../../../api/project";
import PropTypes from 'prop-types';
import ErrorBoundary from "../../../services/ErrorBoundary.jsx";
import "./ProjectPage.css";
import { assets } from '../../assets/assets';

const HouseModel = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl, true, (error) => {
    console.error('Error loading GLTF model:', error);
  });

  return <primitive object={scene} scale={1.5} />;
};

HouseModel.propTypes = {
  modelUrl: PropTypes.string.isRequired,
};

const ProjectPage = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [floorPlan, setFloorPlan] = useState(null);
  const [is3DModelVisible, setIs3DModelVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);

  useEffect(() => {
    getDetails(setProjectDetails, setFloorPlan);
  }, []);

  const toggle3DView = async () => {
    setIs3DModelVisible(prev => !prev);

    if (!is3DModelVisible) {
      setLoading(true);
      await createBlenderProject(floorPlan, setModelUrl);
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    setIsSaving(true);
  
    try {
      const response = await updateProjectDetails(projectDetails);
  
      if (response.status === 200) {
        // Save as downloadable file
        const jsonData = JSON.stringify(projectDetails, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${projectDetails.name || "KAIRA_Project"}.kaira`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
  
        // Redirect after saving
        window.location.href = "/dashboard";
      } else {
        alert("Couldn't update project. Try again later.");
      }
    } catch (error) {
      console.error("Error saving file:", error);
      alert("Something went wrong while saving the file.");
    }
  
    setIsSaving(false);
  };
  

  const discardChanges = () => {
    setShowSavePrompt(false);
    window.location.href = "/dashboard";
  };


  return (
    <div className="project-page">
      <div className="sidebars">
        <div className="sidebars-logo">
          <img src={assets.logo} className="unique-logo" alt="Logo" />
        </div>
        <div className="sidebars-project-details">
          <h3>{projectDetails ? projectDetails.name : "Project"}</h3>
          {projectDetails && (
            <div className="project-metadata">
              <div className="metadata-item">
                <User size={16} />
                <span>{projectDetails.description || "No Description"}</span>
              </div>
              <div className="metadata-item">
                <Calendar size={16} />
                <span>{projectDetails.tags || "No Tags"}</span>
              </div>
              <div className="metadata-item">
                <FileText size={16} />
                <span>{projectDetails.status || "In Progress"}</span>
              </div>
            </div>
          )}
        </div>
        <button className="close-btn" onClick={() => setShowSavePrompt(true)}>
          <X size={16} />
        </button>
      </div>

      <div className="main-content2">
        {error && (
          <div className="error-message">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        <div className="project-info">
          <div className={`content-container ${is3DModelVisible ? "show-3d" : ""}`}>
            {floorPlan && (
              <div className="floor-plan">
                <h3>Floor Plan</h3>
                <img
                  src={`${import.meta.env.VITE_REACT_APP_API_URL}/${floorPlan}`}
                  alt="Uploaded Floor Plan"
                  className="floor-plan-img"
                  onError={(e) => {
                    console.error("Image Load Error:", e);
                  }}
                />
              </div>
            )}

            {is3DModelVisible && modelUrl && (
              <div className="three-container">
                <ErrorBoundary>
                <Canvas shadows camera={{ position: [5, 3, 7], fov: 50 }}>
                  {/* Soft fill */}
                  <ambientLight intensity={0.8} />

                  {/* Sunlight direction */}
                  <directionalLight
                    position={[5, 10, 5]}
                    intensity={6}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                  />

                  {/* Spotlight with a gentle glow */}
                  <spotLight
                    position={[30, 0, 0]}
                    angle={0.4}
                    penumbra={0.7}
                    intensity={6000}
                    castShadow
                  />
                    <HouseModel modelUrl={modelUrl} />
                    <OrbitControls
                      enableZoom={true}
                      zoomSpeed={0.6}
                      enablePan={true}
                      panSpeed={0.5}
                      enableRotate={true}
                      rotateSpeed={0.4}
                      minDistance={2}
                      maxDistance={10}
                      maxPolarAngle={Math.PI / 2}
                    />
                     {/* Extra bounce + depth */}
                      <pointLight position={[-5, 3, -5]} intensity={3} color="#ffe6cc" />
                  </Canvas>
                </ErrorBoundary>
              </div>
            )}
          </div>

          <div className="view-options">
            <button className="view-btn" onClick={toggle3DView}>
              {is3DModelVisible || loading ? "Close 3D View" : "Develop to 3D"}
            </button>
          </div>
        </div>
      </div>

      {showSavePrompt && (
        <div className="save-prompt-modal">
          <p>Are you sure you want to leave? Your changes may not be saved.</p>
          <button onClick={saveChanges} disabled={isSaving}>
            Save
          </button>
          <button onClick={discardChanges}>Don't Save</button>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
