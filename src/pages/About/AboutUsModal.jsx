import React from "react";
import Navbar from "../nav&side/Navbarin";
import Sidebar from "../nav&side/Sidebar";
import "./AboutUsModal.css";

const AboutUs = () => {
  const features = [
    {
      title: "Interactive 3D Visualizations",
      description:
        "KAIRA transforms static 2D floor plans into fully interactive 3D models, enabling users to visualize and explore spaces in detail.",
    },
    {
      title: "Real-Time Customization",
      description:
        "Users can adjust layouts, experiment with furniture placements, and personalize interiors, ensuring better decision-making before construction.",
    },
    {
      title: "VR & AR Integration",
      description:
        "With immersive Virtual and Augmented Reality support, KAIRA enhances spatial understanding, improving collaboration for architects, designers, and homeowners.",
    },
  ];

  return (
    <div className="about-us-page">
      <Navbar />
      <div className="about-us-content">
        <Sidebar />
        <main className="about-main">
          <section className="about-header">
            <h2 className="about-title">About KAIRA</h2>
            <p className="about-description">
              KAIRA is an innovative solution designed to bridge the gap between 2D architectural plans and real-world 3D experiences.
              Our platform enables intuitive space planning, offering users the ability to visualize layouts, customize interiors, 
              and experience designs before construction.
            </p>
          </section>

          <div className="features-container">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          <section className="mission-section">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-description">
              KAIRA aims to revolutionize the design and construction industry by making 3D visualization and VR experiences more 
              accessible and interactive, ultimately reducing costly revisions and improving efficiency.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AboutUs;
