import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // Optional error state

  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get(`http://localhost:3001/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`http://localhost:3001/login`, { username, password });
      const { token, userData } = response.data;
      localStorage.setItem('authToken', token);
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid credentials, please try again.');
      setUser(null);  // Optionally handle logout state on failed login
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
    errorMessage,  // Optional: expose errorMessage
  }), [user, isLoading, errorMessage]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
