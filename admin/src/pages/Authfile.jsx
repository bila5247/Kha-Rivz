import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AuthContext = createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();  // This can now be used without issues

  const signIn = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');  // Use navigate to redirect
  };

  const signOut = () => {
    setIsAuthenticated(false);
    navigate('/login');  // Redirect to login on sign-out
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}  // Ensure children are rendered within Router context
    </AuthContext.Provider>
  );
};
