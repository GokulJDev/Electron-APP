import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Mail, PhoneCall, MessageCircle, X, ChevronRight, Search, HelpCircle, Bookmark } from "lucide-react";
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
        number: "1",
        title: "Contact Support",
        description: "Get in touch with our support team for any assistance.",
        details: "You can reach us via email, phone, or live chat. Our team is available 24/7 to help you with any technical issues, account problems, or questions about our services.",
        icon: PhoneCall,
        contactOptions: [
          { type: "Email", value: "kaira@gmail.com" },
          { type: "Phone", value: "1234567899" },
          { type: "Hours", value: "24/7 Support Available" }
        ]
      },
        {
          number: "3",
          title: "FAQs",
          description: "Find answers to frequently asked questions.",
          details: "Browse our comprehensive FAQ section to resolve common issues quickly without having to contact support.",
          icon: HelpCircle,
          faqItems: [
            { question: "How do I reset my password?", 
              answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to create a new password." },
            { question: "How can I update my account information?", 
              answer: "Navigate to Settings > Account Details where you can edit your personal information and preferences." },
            { question: "What payment methods do you accept?", 
              answer: "We accept all major credit cards, PayPal, and bank transfers for premium subscriptions." },
            { question: "How do I cancel my subscription?",
              answer: "To cancel your subscription, go to Settings > Subscription and click on 'Cancel Subscription'. Follow the confirmation steps to complete the process." },
            { question: "Can I download my data?",
              answer: "Yes, you can request a download of all your data from Settings > Privacy > Download My Data. The process may take up to 24 hours to complete." }
          ]
        },
        {
          number: "4",
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
    { title: "Getting Started with KAIRA Projects", views: 1243 },
    { title: "Securing Your KAIRA Workspace", views: 987 },
    { title: "Fixing Model Load & Render Issues", views: 856 },
    { title: "Exploring KAIRA's VR Preview Mode", views: 762 }
  ];
  

  // Enhanced chatbot functionality
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Common support responses
  const quickResponses = {
    "password": "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email.",
    "account": "You can update your account information by navigating to Settings > Account Details.",
    "payment": "We accept all major credit cards, PayPal, and bank transfers for premium subscriptions.",
    "contact": "You can reach our support team via email at kaira@gmail.com or by phone at 1234567899.",
    "help": "I'm here to help! You can ask me about account issues, technical problems, billing questions, or any other support needs.",
    "default": "Thanks for your message. I'll connect you with a support agent shortly. Is there anything specific you'd like help with while you wait?"
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: "user", text: userInput }]);
    
    // Set typing indicator
    setIsTyping(true);
    
    // Generate a response based on keywords
    setTimeout(() => {
      setIsTyping(false);
      
      // Check for keywords in the user's message
      const lowerCaseInput = userInput.toLowerCase();
      let botResponse = quickResponses.default;
      
      if (lowerCaseInput.includes("password")) {
        botResponse = quickResponses.password;
      } else if (lowerCaseInput.includes("account")) {
        botResponse = quickResponses.account;
      } else if (lowerCaseInput.includes("payment") || lowerCaseInput.includes("pay")) {
        botResponse = quickResponses.payment;
      } else if (lowerCaseInput.includes("contact") || lowerCaseInput.includes("email") || lowerCaseInput.includes("phone")) {
        botResponse = quickResponses.contact;
      } else if (lowerCaseInput.includes("help") || lowerCaseInput.includes("support")) {
        botResponse = quickResponses.help;
      }
      
      setChatMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
      
      // If it's a general inquiry, add a follow-up message after a delay
      if (botResponse === quickResponses.default) {
        setTimeout(() => {
          setChatMessages(prev => [...prev, { 
            sender: "bot", 
            text: "While I'm connecting you with a specialist, you might want to check our FAQ section for quick answers to common questions."
          }]);
        }, 2000);
      }
    }, 1000);
    
    setUserInput("");
  };

  // Function to handle FAQ item clicks
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const handleFAQClick = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
                            
                            {/* FAQs Content - Improved to ensure visibility */}
                            {topic.title === "FAQs" && topic.faqItems && (
                              <div className="faq-list">
                                {topic.faqItems.map((faq, i) => (
                                  <div key={i} className="faq-item">
                                    <div 
                                      className={`faq-question ${openFAQ === i ? 'active' : ''}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleFAQClick(i);
                                      }}
                                    >
                                      <span>{faq.question}</span>
                                      <ChevronRight className={`faq-chevron ${openFAQ === i ? 'rotate' : ''}`} size={16} />
                                    </div>
                                    {openFAQ === i && (
                                      <div className="faq-answer">
                                        {faq.answer}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
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
      
      {/* Enhanced Chat Window */}
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
            {isTyping && (
              <div className="chat-message bot typing">
                <span className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-quick-responses">
            <button onClick={() => {
              setUserInput("How do I reset my password?");
              setTimeout(() => {
                document.querySelector('.send-message-btn').click();
              }, 100);
            }}>Password Reset</button>
            <button onClick={() => {
              setUserInput("Update account info");
              setTimeout(() => {
                document.querySelector('.send-message-btn').click();
              }, 100);
            }}>Account Info</button>
            <button onClick={() => {
              setUserInput("Payment methods");
              setTimeout(() => {
                document.querySelector('.send-message-btn').click();
              }, 100);
            }}>Payments</button>
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