import React from "react"; // Ensure this is at the top
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.userId, role: decoded.role });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Clear invalid token
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.userId, role: decoded.role });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;