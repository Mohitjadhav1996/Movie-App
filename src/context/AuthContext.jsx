import { useContext, useState } from "react";
import React from 'react'

// Create the context
export const AuthContext = React.createContext();

// Export the context so it can be used elsewhere if needed
 

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  // Login API call
  const login = async (username, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.username);
        setAccessToken(data.token);
        localStorage.setItem("authtoken", data.token);
        return true;
      } else {
        console.error("Login failed");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  // Logout API
  const logout = () => {
    setUser(null);
    setAccessToken("");
    localStorage.setItem("authtoken", "");
  };

  // Provide the context value
  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
