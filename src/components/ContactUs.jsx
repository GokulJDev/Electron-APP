import React, { useState } from 'react';
import './ContactUs.css';
import PropTypes from 'prop-types';
import { FaLocationArrow, FaEnvelope, FaPhone } from 'react-icons/fa';


const ContactUs = ({ 
  onSubmit = () => {},
  defaultLocation = "Chenagannur, Kerala",
  defaultEmail = "kaira@gmail.com",
  defaultPhone = "9061470096"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="contact-us-container">
      <div className="contact-wrapper">
        <h1 className="main-title animated-gradient">Contact Us</h1>
        <h2 className="subtitle">For Any Queries and Support</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="icon-wrapper">
                <FaLocationArrow size="24" />
              </div>
              <div className="info-text">
                <h3>Location</h3>
                <p>{defaultLocation}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-wrapper">
                <FaEnvelope size="24" />
              </div>
              <div className="info-text">
                <h3>Drop Us An E-mail</h3>
                <p>{defaultEmail}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-wrapper">
                <FaPhone size="24" />
              </div>
              <div className="info-text">
                <h3>Call Us</h3>
                <p>{defaultPhone}</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number*"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            
            <input
              type="text"
              name="subject"
              placeholder="Subject*"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            
            <textarea
              name="message"
              placeholder="Message*"
              value={formData.message}
              onChange={handleChange}
              required
            />
            
            <button type="submit" className="submit-btn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

ContactUs.propTypes = {
  onSubmit: PropTypes.func,
  defaultLocation: PropTypes.string,
  defaultEmail: PropTypes.string,
  defaultPhone: PropTypes.string
};

export default ContactUs;
