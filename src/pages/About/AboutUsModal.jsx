import React, { useState } from "react";
import { Building, Users, Laptop, Target, Github, Linkedin, Mail } from "lucide-react";
import Navbar from "../nav&side/Navbarin";
import Sidebar from "../nav&side/Sidebar";
import "./AboutUsModal.css";

const AboutUs = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const teamMembers = [
    {
      name: "Gokul J Dev",
      role: "Team Lead & Full Stack Developer",
      bio: "Leading the development of KAIRA with expertise in full-stack technologies and architectural visualization.",
      image: "/team/gokul.jpg" // Replace with actual image path
    },
    {
      name: "Nandana Suresh V",
      role: "Frontend Developer",
      bio: "Specializing in creating intuitive user interfaces and seamless user experiences.",
      image: "/team/nandana.jpg" // Replace with actual image path
    },
    {
      name: "Sheryl Susan Sujan",
      role: "Backend Developer",
      bio: "Focused on building robust backend systems and efficient data management solutions.",
      image: "/team/sheryl.jpg" // Replace with actual image path
    },
    {
      name: "Vaisakh R Nair",
      role: "3D Visualization Specialist",
      bio: "Expert in 3D modeling and virtual reality integration for architectural visualization.",
      image: "/team/vaisakh.jpg" // Replace with actual image path
    }
  ];

  const features = [
    {
      title: "Interactive 3D Visualization",
      description: "Transform 2D plans into immersive 3D experiences",
      icon: Building
    },
    {
      title: "Real-time Customization",
      description: "Modify and visualize changes instantly",
      icon: Laptop
    },
    {
      title: "VR Integration",
      description: "Experience designs in virtual reality",
      icon: Target
    }
  ];

  return (
    <div className="about-container">
      <Navbar />
      <div className="about-content">
        <Sidebar />
        <main className="about-main">
          <div className="about-card">
            <div className="about-card-header">
              <h1 className="about-title">About KAIRA</h1>
            </div>
            
            <div className="about-card-content">
              <div className="features-grid">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="feature-card">
                      <div className="feature-content">
                        <div className="feature-icon-container">
                          <Icon className="feature-icon" />
                        </div>
                        <div className="feature-info">
                          <h3 className="feature-title">{feature.title}</h3>
                          <p className="feature-description">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="team-section">
                <div className="team-header">
                  <h2 className="team-title">Meet Our Team</h2>
                </div>
                <div className="team-grid">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-card animate-fadeUp" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="team-member-avatar">
                        <img src={member.image} alt={member.name} />
                      </div>
                      <h3 className="team-member-name">{member.name}</h3>
                      <p className="team-member-role">{member.role}</p>
                      <p className="team-member-bio">{member.bio}</p>
                      <div className="team-social-links">
                        <a href="#" className="social-link">
                          <Github size={18} />
                        </a>
                        <a href="#" className="social-link">
                          <Linkedin size={18} />
                        </a>
                        <a href="#" className="social-link">
                          <Mail size={18} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutUs;