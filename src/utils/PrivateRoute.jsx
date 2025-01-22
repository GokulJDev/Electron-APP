import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ element, redirectTo = '/' }) => {
  const { user } = useAuth();
  
  if (!user) {
    // If user is not authenticated, redirect to login or custom page
    return <Navigate to={redirectTo} />;
  }

  // If user is authenticated, render the passed component
  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
