import React, { useState } from 'react';
import './Login.css';
import { authLogin } from '../../../api/auth';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onClose = () => {
    setActiveMenu("LOGIN");
    window.location.href = "/";
  };
  
  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      await authLogin({ username, password });
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
    setIsLoading(false);
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
              placeholder="kaira_user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <div className="password-container">
            <label>
              Password
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
          </div>

          <a href="./forgot" className="forgot-password">Forgot password?</a>

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


export default Login;
