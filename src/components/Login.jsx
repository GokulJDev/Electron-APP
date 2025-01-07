import React from 'react';
import './Login.css';

const LoginSidebar = ({ onClose }) => {
  return (
    <div className="login-sidebar">
      <button className="close-sidebar" onClick={onClose}>
        &times;
      </button>
      <h2>Login</h2>
      <form className="login-form">
        <label>
          Email/User name
          <input type="text" placeholder="Enter your email or username" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter your password" />
        </label>
        <button type="submit" className="login-submit">Login</button>
      </form>
      <a href="#" className="forgot-password">Forgot Password?</a>
    </div>
  );
};

export default LoginSidebar;
