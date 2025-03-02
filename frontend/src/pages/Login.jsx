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
    <div className="login-container">
      <div className="login-card">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}> {/* Slightly increased margin for bigger box */}
          <div className="icon-circle">
            <FaLock className="icon" color="#20a665" size={24} /> {/* Larger icon for bigger box */}
          </div>
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#20a665", marginBottom: "24px", textAlign: "center" }}>Welcome Task Management</h1> {/* Larger font and centered for bigger box */}
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              style={{ textAlign: "center" }} /* Center input text */
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input"
              style={{ textAlign: "center" }} /* Center input text */
            />
          </div>
          <button type="submit" style={{ marginTop: "24px", display: "block", marginLeft: "auto", marginRight: "auto" }}>Sign In</button> {/* Centered button */}
        </form>
        <p style={{ textAlign: "center", marginTop: "24px", color: "#666", fontSize: "16px" }}> {/* Larger font and centered for bigger box */}
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: "#20a665", textDecoration: "none", fontWeight: "600" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;