import React, { useState, useEffect, useRef } from "react";
import { LifeBuoy, Mail, PhoneCall, MessageCircle, X, ChevronRight, Search, HelpCircle } from "lucide-react";
import Navbar from "../nav&side/Navbarin";
import Sidebar from "../nav&side/Sidebar";
import "./Support.css";

const Support = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("support");
  const [showChatbot, setShowChatbot] = useState(false);
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
            }, index * 200);
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
      details: "You can reach us via email, phone, or live chat. Our team is available 24/7 to help you with any technical issues, account problems, or questions about our services.",
      icon: PhoneCall,
      contactOptions: [
        { type: "Email", value: "support@example.com" },
        { type: "Phone", value: "+1 (555) 123-4567" },
        { type: "Hours", value: "24/7 Support Available" }
      ]
    },
    {
      title: "FAQs",
      description: "Find answers to frequently asked questions.",
      details: "Browse our comprehensive FAQ section to resolve common issues quickly without having to contact support.",
      icon: LifeBuoy,
      faqItems: [
        { question: "How do I reset my password?", 
          answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to create a new password." },
        { question: "How can I update my account information?", 
          answer: "Navigate to Settings > Account Details where you can edit your personal information and preferences." },
        { question: "What payment methods do you accept?", 
          answer: "We accept all major credit cards, PayPal, and bank transfers for premium subscriptions." }
      ]
    },
    {
      title: "Submit a Ticket",
      description: "Report an issue or request help.",
      details: "Fill out our support form with details about your issue, and our team will get back to you within 24 hours.",
      icon: Mail,
      formFields: [
        { label: "Subject", type: "text", placeholder: "Brief description of your issue" },
        { label: "Category", type: "select", options: ["Technical Issue", "Billing Question", "Feature Request", "Other"] },
        { label: "Priority", type: "select", options: ["Low", "Medium", "High", "Critical"] },
        { label: "Description", type: "textarea", placeholder: "Please provide as much detail as possible" }
      ]
    },
    {
      title: "Live Chat",
      description: "Chat with a support agent in real time.",
      details: "Connect with a support representative instantly to get immediate assistance with your questions or issues.",
      icon: MessageCircle,
    }
  ];

  const filteredTopics = supportTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentArticles = [
    { title: "Getting Started Guide", views: 1243 },
    { title: "Account Security Best Practices", views: 987 },
    { title: "Troubleshooting Connection Issues", views: 856 },
    { title: "How to Use Advanced Features", views: 762 }
  ];

  // Simple mock chatbot functionality
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: "user", text: userInput }]);
    
    // Mock response after delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        text: "Thanks for your message. A support agent will respond shortly. In the meantime, you might want to check our FAQ section for quick answers."
      }]);
    }, 1000);
    
    setUserInput("");
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Mocked submission - would connect to backend in real implementation
    alert("Support ticket submitted successfully! We'll get back to you soon.");
    setExpandedTopic(null);
  };

  return (
    <div className={`support-container ${showChatbot ? 'blur-overlay active' : ''}`}>
      <Navbar links={links} />
      
      <div className="support-content">
        <Sidebar />
        
        <main className="support-main">
          {/* Support Hero Section */}
          <div className="support-hero">
            <div className="support-hero-content">
              <h1 className="support-hero-title">How can we help you today?</h1>
              <div className="search-container">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="support-tabs">
            <button 
              className={`support-tab ${activeTab === 'support' ? 'active' : ''}`} 
              onClick={() => setActiveTab('support')}>
              Support Options
            </button>
            <button 
              className={`support-tab ${activeTab === 'articles' ? 'active' : ''}`} 
              onClick={() => setActiveTab('articles')}>
              Help Articles
            </button>
          </div>
          
          {activeTab === 'support' && (
            <div className="support-card">
              <div className="support-card-header">
                <h2 className="support-title">Support Center</h2>
              </div>
              
              <div className="support-card-content">
                <div className="topics-grid-support">
                  {filteredTopics.map((topic, index) => {
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
                          <ChevronRight className={`chevron-icon ${isExpanded ? 'rotate' : ''}`} />
                        </div>
                        
                        {isExpanded && (
                          <div className="topic-extra-content">
                            <p className="topic-details-support">{topic.details}</p>
                            
                            {/* Contact Support Content */}
                            {topic.title === "Contact Support" && topic.contactOptions && (
                              <div className="contact-options">
                                {topic.contactOptions.map((option, i) => (
                                  <div key={i} className="contact-option">
                                    <span className="contact-label">{option.type}:</span>
                                    <span className="contact-value">{option.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* FAQs Content */}
                            {topic.title === "FAQs" && topic.faqItems && (
                              <div className="faq-list">
                                {topic.faqItems.map((faq, i) => (
                                  <details key={i} className="faq-item">
                                    <summary className="faq-question">{faq.question}</summary>
                                    <p className="faq-answer">{faq.answer}</p>
                                  </details>
                                ))}
                              </div>
                            )}
                            
                            {/* Submit Ticket Form */}
                            {topic.title === "Submit a Ticket" && topic.formFields && (
                              <form className="ticket-form" onSubmit={handleTicketSubmit}>
                                {topic.formFields.map((field, i) => (
                                  <div key={i} className="form-group">
                                    <label className="form-label">{field.label}</label>
                                    {field.type === 'select' ? (
                                      <select className="form-input form-select" required>
                                        <option value="">Select an option</option>
                                        {field.options.map((option, j) => (
                                          <option key={j} value={option}>{option}</option>
                                        ))}
                                      </select>
                                    ) : field.type === 'textarea' ? (
                                      <textarea 
                                        className="form-input form-textarea" 
                                        placeholder={field.placeholder}
                                        required
                                      ></textarea>
                                    ) : (
                                      <input 
                                        type={field.type} 
                                        className="form-input" 
                                        placeholder={field.placeholder}
                                        required
                                      />
                                    )}
                                  </div>
                                ))}
                                <button type="submit" className="submit-ticket-btn">Submit Ticket</button>
                              </form>
                            )}
                            
                            {/* Live Chat Content */}
                            {topic.title === "Live Chat" && (
                              <div className="live-chat-prompt">
                                <p>Our support agents are ready to assist you.</p>
                                <button 
                                  className="start-chat-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowChatbot(true);
                                  }}
                                >
                                  Start Chat Now
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'articles' && (
            <div className="support-card">
              <div className="support-card-header">
                <h2 className="support-title">Help Articles</h2>
              </div>
              
              <div className="support-card-content">
                <div className="articles-section">
                  <h3 className="section-title">Popular Articles</h3>
                  <div className="articles-grid">
                    {recentArticles.map((article, index) => (
                      <div key={index} className="article-card">
                        <h4 className="article-title">{article.title}</h4>
                        <div className="article-meta">
                          <span className="article-views">{article.views} views</span>
                          <button className="read-more-btn">Read More <ChevronRight size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick Help Button */}
          <button 
            className="quick-help-btn"
            onClick={() => setShowChatbot(true)}
          >
            <MessageCircle size={24} />
            <span>Need Help?</span>
          </button>
        </main>
      </div>
      
      {/* Chat Window */}
      {showChatbot && (
        <div className="chat-window modal-window">
          <div className="chat-header">
            <div className="chat-title">
              <MessageCircle size={18} />
              <span>Support Chat</span>
            </div>
            <button 
              className="close-chat-btn"
              onClick={() => setShowChatbot(false)}
            >
              <X size={18} />
            </button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chat-input-form" onSubmit={handleChatSubmit}>
            <input
              type="text"
              placeholder="Type your message here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="chat-input"
            />
            <button type="submit" className="send-message-btn">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Support;