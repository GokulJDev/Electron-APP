import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';

const LoginSidebar = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='wel'>Welcome Back!</h2>
        <p className='para'>Enter your details to login and continue</p>
        <form className="login-form">
          <label>
            Username
            <input type="text" placeholder="example@gmail.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="********" />
          </label>
          <a href="/" className="forgot-password">Forgot password?</a>
          <button type="submit" className="login-submit">Login</button>
        </form>
        <p className='para'>
          Don’t have an account? <a href="www.google.com" className="signup-link">Get an Account</a>
        </p>
        <a href="/" className="skip-for-now" onClick={onClose}>Skip for now &rarr;</a>
      </div>
    </div>
  );
};

LoginSidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginSidebar;
