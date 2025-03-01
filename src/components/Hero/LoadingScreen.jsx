import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import "./LoadingScreen.css";

const phrases = [
  "Booting up KAIRA...",
  "Establishing virtual link...",
  "Synchronizing 3D environment...",
  "Rendering your digital space...",
  "Configuring holographic grid...",
  "Finalizing immersive experience..."
];

const LoadingScreen = ({ onLoaded }) => {
  const [text, setText] = useState(phrases[0]);
  const [fade, setFade] = useState(true);
  const [loading, setLoading] = useState(false);
  const [contentFetched, setContentFetched] = useState(false);
  let previousIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * phrases.length);
        } while (newIndex === previousIndex);
        previousIndex = newIndex;
        setText(phrases[newIndex]);
        setFade(true);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Detect when page fully loads
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (!contentFetched) {
        setLoading(true);
      }
    }, 500); // Delay before showing the loading screen

    window.onload = () => {
      clearTimeout(loadingTimeout);
      setContentFetched(true);
      setTimeout(() => {
        setLoading(false);
        onLoaded();
      }, 1000);
    };
  }, [onLoaded, contentFetched]);

  return (
    <div className={`loading-screen ${loading ? "" : "fade-out"}`}>
      <div className="hologram-container">
        <div className="energy-ring"></div>
        <div className="hologram">
          <img src={assets.logo} alt="KAIRA Logo" className="hologram-logo" />
        </div>
      </div>
      <p className={`loading-text ${fade ? "fade-in" : "fade-out"}`}>{text}</p>
      <div className="floating-particles"></div>
    </div>
  );
};

LoadingScreen.propTypes = {
  onLoaded: PropTypes.func.isRequired,
};

export default LoadingScreen;