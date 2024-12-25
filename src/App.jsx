import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/Herosection';
import AboutUsSection from './components/Aboutussection';
import HowItWorks from './components/HowItWorks';
import './App.css'; // Main global styles for your app
import ContactUs from './components/ContactUs';
import ProjectsSection from './components/Projectssection';

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutUsSection />
      <HowItWorks />
      <ProjectsSection/>
      <ContactUs/>
    </div>
  );
};

export default App;
