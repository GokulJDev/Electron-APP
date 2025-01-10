import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import Navbar from './components/Navbar';
import HeroSection from './components/Herosection';
import AboutUsSection from './components/AboutUsSection';
import HowItWorks from './components/HowItWorks';
import ProjectsSection from './components/ProjectsSection';
import ContactUs from './components/ContactUs';
import Login from './components/Login'; // Import the Login modal component
import './App.css';
import Dashboard from './AfterLogin/Dashboard';

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Functions to handle login modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Router>
      {/* Pass openLoginModal as a prop to Navbar */}
      <Navbar onLoginClick={openLoginModal} />
      <Routes>
        {/* Define the routes for different components */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutUsSection />} />
        <Route path="/steps" element={<HowItWorks />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      {/* Render the Login modal conditionally */}
      {isLoginModalOpen && <Login onClose={closeLoginModal} />}
    </Router>
  );
};

export default App;
