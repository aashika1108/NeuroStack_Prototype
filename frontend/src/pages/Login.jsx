import React from "react"; // Add this import at the top
import { useState, useContext } from "react";
import { login } from "../services/api";
import AuthContext from "../context/AuthContext";

// Lock Icon as SVG
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#9333ea"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);

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
            <LockIcon />
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
      </div>
    </div>
  );
};

export default Login;