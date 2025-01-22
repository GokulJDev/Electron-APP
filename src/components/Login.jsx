import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    setIsLoading(true); // Set loading state to true while making the request

    try {
      // Make API request to backend (using an environment variable for the API URL)
      const response = await axios.post(`http://localhost:3001/login`, {
        username,
        password,
      });

      const { token } = response.data;
      
      // Store the token (consider using httpOnly cookies for better security in production)
      localStorage.setItem('authToken', token);

      // Close the login modal and navigate to dashboard
      onClose();
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false); // Set loading state to false after the request finishes
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Invalid credentials');
      } else {
        setErrorMessage('Server error, please try again later');
      }
    }
  };

  return (
    <div className="modal-overlay-login">
      <div className="modal-content-login">
        <h2 className="wel">Welcome Back!</h2>
        <p className="para">Enter your details to login and continue</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            Username
            <input
              type="text"
              placeholder="example@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <a href="/" className="forgot-password">Forgot password?</a>
          <button type="submit" className="login-submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="para">
          Don’t have an account? <a href="https://www.google.com" className="signup-link">Get an Account</a>
        </p>
        <a href="/" className="skip-for-now" onClick={onClose}>
          Skip for now &rarr;
        </a>
      </div>
    </div>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Login;
