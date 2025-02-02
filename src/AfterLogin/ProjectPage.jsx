import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { X, AlertTriangle } from "lucide-react";
import "./ProjectPage.css";

const HouseModel = () => {
  const { scene } = useGLTF("/assets/houseplan.glb");
  const modelRef = useRef();

  useEffect(() => {
    let frameId;
    const animate = () => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Rotate model
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return <primitive ref={modelRef} object={scene} scale={2} />;
};

const ProjectPage = ({ projectId, onClose }) => {
  const [floorPlan, setFloorPlan] = useState(null);
  const [is3DModelReady, setIs3DModelReady] = useState(true); // Set to true since we're loading it
  const [loading3D, setLoading3D] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load floor plan from assets
    setFloorPlan("/assets/floor-plan.jpg");
  }, [projectId]);

  return (
    <div className="project-page">
      <div className="modal-header">
        <h2>Project Details</h2>
        <button className="close-btn" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      <div className="project-info">
        {floorPlan && (
          <div className="floor-plan">
            <h3>Floor Plan</h3>
            <img src={floorPlan} alt="Uploaded Floor Plan" className="floor-plan-img" />
          </div>
        )}

        <div className="view-options">
          <button className="view-btn" onClick={() => setLoading3D(!loading3D)}>
            {loading3D ? "Hide 3D Model" : "View in 3D"}
          </button>
        </div>

        {loading3D && (
          <div className="three-container">
            <Canvas camera={{ position: [5, 2, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <HouseModel />
              <OrbitControls />
            </Canvas>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
