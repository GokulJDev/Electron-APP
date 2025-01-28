import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection'; // Ensure consistent naming
import AboutUsSection from './components/AboutUsSection'; // Ensure consistent naming
import HowItWorks from './components/HowItWorks';
import ProjectsSection from './components/ProjectsSection';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import './App.css';
import Dashboard from './AfterLogin/Dashboard';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './utils/PrivateRoute';

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
    <AuthProvider>
      <Router>
        <Navbar onLoginClick={openLoginModal} />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/steps" element={<HowItWorks />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Protect the Dashboard route */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>

        {/* Conditional rendering for the Login modal */}
        {isLoginModalOpen && <Login onClose={closeLoginModal} />}
      </Router>
    </AuthProvider>
  );
};

export default App;
