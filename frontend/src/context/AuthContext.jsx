// ✅ Correct full code for AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);

// ✅ Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
