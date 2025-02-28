import React from "react"; // Ensure this is present
import { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaLock } from "react-icons/fa"; // Import Font Awesome lock icon
import { login } from "../services/api";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      loginUser(response.data.token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="center-flex">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div className="icon-circle">
            <FaLock className="icon" color="#9333ea" size={24} /> {/* Use FaLock with 24px size */}
          </div>
        </div>
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input"
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "16px", color: "#666" }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: "#9333ea", textDecoration: "none", fontWeight: "600" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;