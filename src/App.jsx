import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './components/Hero/Herosection';
import AboutUsSection from './components/Aboutus/Aboutussection';
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
import Support from './pages/Support/Support';
import Profile from './pages/Profile/Profile';

const App = () => {

  return (
      <Router>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/workflow" element={<HowItWorks />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/project/:project_id" element={<ProjectPage />} />
          <Route path="/weare" element={<AboutUsModal />} />
          <Route path="/support" element={<Support/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
  );
};

export default App;
