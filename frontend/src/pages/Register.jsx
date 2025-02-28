import React from "react"; // Ensure this is present
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaUserPlus } from "react-icons/fa"; // Import Font Awesome user plus icon
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

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
    <div className="center-flex">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div className="icon-circle">
            <FaUserPlus className="icon" color="#9333ea" size={24} /> {/* Use FaUserPlus with 24px size */}
          </div>
        </div>
        <h1>Join NeuroStack</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
            />
          </div>
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
          <div className="form-group">
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "16px", color: "#666" }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: "#9333ea", textDecoration: "none", fontWeight: "600" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;