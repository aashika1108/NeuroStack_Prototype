import React from "react"; // Ensure this is present
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
import { FaUserPlus } from "react-icons/fa"; // Import Font Awesome user plus icon
import { register } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="card no-scroll" style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <div className="icon-circle">
            <FaUserPlus className="icon" color="#20a665" size={24} /> {/* Green icon for theme, matching Login */}
          </div>
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#20a665", marginBottom: "24px", textAlign: "center" }}>Join NeuroStack</h1> {/* Matching Login font and color */}
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              style={{ textAlign: "center" }} /* Center input text, matching Login */
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              style={{ textAlign: "center" }} /* Center input text, matching Login */
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input"
              style={{ textAlign: "center" }} /* Center input text, matching Login */
            />
          </div>
          <div className="form-group">
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input"
              style={{ textAlign: "center" }} /* Center select text, matching Login */
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={{ marginTop: "24px", display: "block", marginLeft: "auto", marginRight: "auto" }}>Sign Up</button> {/* Centered button, matching Login */}
        </form>
        <p style={{ textAlign: "center", marginTop: "24px", color: "#666", fontSize: "16px" }}> {/* Matching Login font and color */}
          Already have an account?{' '}
          <Link to="/login" style={{ color: "#20a665", textDecoration: "none", fontWeight: "600" }}> {/* Matching Login color and style */}
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;