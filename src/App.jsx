import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUsSection from './components/AboutUsSection';
import HowItWorks from './components/HowItWorks';
import ProjectsSection from './components/ProjectsSection';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import './App.css';
import Dashboard from './AfterLogin/Dashboard';
import Learn from './AfterLogin/Learn';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
          {/* Public routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/steps" element={<HowItWorks />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
        </Routes>

        {isLoginModalOpen && <Login onClose={closeLoginModal} />}
      </Router>
    </AuthProvider>
  );
};

export default App;