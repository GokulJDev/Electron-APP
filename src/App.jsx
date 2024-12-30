import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUsSection from './components/AboutUsSection';
import HowItWorks from './components/HowItWorks';
import ProjectsSection from './components/ProjectsSection';
import ContactUs from './components/ContactUs';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define the routes for different components */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutUsSection />} />
        <Route path="/steps" element={<HowItWorks />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;
