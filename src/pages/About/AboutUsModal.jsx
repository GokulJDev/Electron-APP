import React, { useState } from "react";
import { Building, Users, Laptop, Target, Github, Linkedin, Mail } from "lucide-react";
import Navbar from "../nav&side/Navbarin";
import Sidebar from "../nav&side/Sidebar";
import "./AboutUsModal.css";
import { assets } from '../../assets/assets';

const AboutUs = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const teamMembers = [
    {
      name: "Sheryl Susan Sujan",
      role: "Team Lead & Frontend Developer",
      bio: "Leading the development of KAIRA with expertise in frontend technologies and team management.",
      image:assets.sheryl,
      github: "https://github.com/sherylsujan",  // Replace with actual links
      linkedin: "https://www.linkedin.com/in/sherylsusansujan/",
      email: "sherylsusansujan@gmail.com"
    },
    {
      name: "Gokul J Dev",
      role: "Backend Developer & 2D to 3D Automation",
      bio: "Developing backend systems and automating 2D to 3D transformation.",
      image: assets.gokul,
      github: "https://github.com/GokulJDev",  // Replace with actual links
      linkedin: "https://www.linkedin.com/in/gokul-j-dev/",
      email:"gokuljdevpulickal@gmail.com" 
    },
    {
      name: "Nandana Suresh V",
      role: "Frontend Developer",
      bio: "Specializing in creating intuitive user interfaces and seamless user experiences.",
      image: assets.nandu,
      github: "https://github.com/Nandanans9072",  // Replace with actual links
      linkedin: "https://www.linkedin.com/in/nandana-ns/",
      email: "nsnandana812@gmail.com"
    },
    {
      name: "Vaisakh R Nair",
      role: "Backend Developer",
      bio: "Integrating interactive 3D floor plan editing with features like color customization and furniture placement.",
      image: assets.vais,
      github: "https://github.com/Vaisakh-3759",  // Replace with actual links
      linkedin: "https://www.linkedin.com/in/vaisakh-r-nair/",
      email: "vaisakhrn@gmail.com"
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
  {member.github && (
    <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link">
      <Github size={18} />
    </a>
  )}
  {member.linkedin && (
    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
      <Linkedin size={18} />
    </a>
  )}
  {member.email && (
    <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}&su=Hello&body=I%20would%20like%20to%20connect.`}
  target="_blank"
  rel="noopener noreferrer"
  className="social-link"
>
  <Mail size={18} />
</a>


  )}
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