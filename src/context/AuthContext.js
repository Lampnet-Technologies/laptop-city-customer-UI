import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Context for Authentication
const AuthContext = createContext();

// 2. AuthProvider will wrap the whole app so all components can access auth state
export const AuthProvider = ({ children }) => {
  // Store user data in state (null means not logged in)
  const [user, setUser] = useState(null);

  // (Optional) To Persist login using localStorage or a cookie
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes (for persistence)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Function: Log in user
  const login = (userData) => {
    setUser(userData);
  };

  // Function: Log out user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Function: Check if logged in
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use AuthContext anywhere in the app
export const useAuthContext = () => {
  return useContext(AuthContext);
};
