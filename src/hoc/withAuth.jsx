import { Navigate } from 'react-router-dom';
import authService from '../services/AuthService';

/**
 * Higher-Order Component (HOC) Pattern
 * Protects routes that require authentication
 */
export const withAuth = (Component) => {
  return (props) => {
    if (!authService.isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return <Component {...props} />;
  };
};

/**
 * HOC for redirecting authenticated users
 */
export const withoutAuth = (Component) => {
  return (props) => {
    if (authService.isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return <Component {...props} />;
  };
};

