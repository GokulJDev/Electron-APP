import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import HeroSection from './components/Hero/Herosection';
import AboutUsSection from './components/Aboutus/AboutUsSection';
import HowItWorks from './components/Steps/HowItWorks';
import ProjectsSection from './components/Project/ProjectsSection';
import ContactUs from './components/Contactus/ContactUs';
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/forgot';
import './App.css';
import Dashboard from './pages/Dash/Dashboard';
import Learn from './pages/steps/Learn';
import ProjectPage from './pages/project/ProjectPage';
import AboutUsModal from './pages/About/AboutUsModal';

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
      <Router>
        <Navbar onLoginClick={openLoginModal} />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/steps" element={<HowItWorks />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/learn"
            element={<Learn />}
          />
        <Route
            path="/projectpage"
            element={<ProjectPage />}
          />

           <Route
            path="/weare"
            element={<AboutUsModal />}
          />
        </Routes>

        {isLoginModalOpen && <Login onClose={closeLoginModal} />}
      </Router>
  );
};

export default App;