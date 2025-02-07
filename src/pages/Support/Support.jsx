import React, { useState, useEffect, useRef } from "react";
import { LifeBuoy, Mail, PhoneCall, MessageCircle } from "lucide-react";
import Navbar from "../nav&side/Navbarin";
import Sidebar from "../nav&side/Sidebar";
import "./Support.css";

const Support = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const topicRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = topicRefs.current.findIndex(ref => ref === entry.target);
          if (!visibleItems.includes(index)) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200); // Reduced from 400ms to 200ms for faster sequence
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    topicRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      topicRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleItems]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/settings" },
    { label: "Learn", href: "/learn" },
  ];

  const supportTopics = [
    {
      title: "Contact Support",
      description: "Get in touch with our support team for any assistance.",
      details: "You can reach us via email, phone, or live chat. Our team is available 24/7 to help you.",
      icon: PhoneCall,
    },
    {
      title: "FAQs",
      description: "Find answers to frequently asked questions.",
      details: "Browse our comprehensive FAQ section to resolve common issues quickly.",
      icon: LifeBuoy,
    },
    {
      title: "Submit a Ticket",
      description: "Report an issue or request help.",
      details: "Fill out our support form with details about your issue, and our team will get back to you soon.",
      icon: Mail,
    },
  ];

  return (
    <div className="support-container">
      <Navbar links={links} />
      
      <div className="support-content">
        <Sidebar />
        
        <main className="support-main">
          <div className="support-card">
            <div className="support-card-header">
              <h2 className="support-title">Support Center</h2>
            </div>
            
            <div className="support-card-content">
              <div className="topics-grid-support">
                {supportTopics.map((topic, index) => {
                  const Icon = topic.icon;
                  const isExpanded = expandedTopic === index;
                  const isVisible = visibleItems.includes(index);
                  
                  return (
                    <div
                      key={index}
                      ref={el => topicRefs.current[index] = el}
                      className={`topic-card-support slide-in ${isExpanded ? "active" : ""} ${isVisible ? "slide-in-visible" : ""}`}
                      onClick={() => setExpandedTopic(isExpanded ? null : index)}
                    >
                      <div className="topic-content-support">
                        <div className="topic-icon-container-support">
                          <Icon className="topic-icon-support" />
                        </div>
                        <div className="topic-info-support">
                          <h3 className="topic-title-support">{topic.title}</h3>
                          <p className="topic-description-support">{topic.description}</p>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="topic-extra-content">
                          <p className="topic-details-support">{topic.details}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;