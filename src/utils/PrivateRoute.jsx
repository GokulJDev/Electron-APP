import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const { user } = useAuth();
  
  if (!user) {
    // If the user is not authenticated, redirect to login or custom page
    return <Navigate to={redirectTo} />;
  }

  // If the user is authenticated, render the passed component
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
