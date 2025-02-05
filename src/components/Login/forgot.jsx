import React, { useState } from 'react';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMessage('Password reset link sent! Check your email.');
    } catch (error) {
      setErrorMessage('Failed to send reset link. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="modal-overlay-login">
      <div className="modal-content-login">
        <h2 className="wel">Forgot Password?</h2>
        <p className="para">Enter your email and we’ll send you a link to reset your password.</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form className="login-form" onSubmit={handleResetPassword}>
          <label>
            Email Address
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button type="submit" className="login-submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <a href="/login" className="skip-for-now" onClick={onClose}>
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
