import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import AuthContext from "../context/AuthContext";
import "./Login.css"; // Using the simplified, modern CSS from the last response

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login: contextLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      contextLogin(response.data.token); // Assuming the API returns { token }
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src="/src/assets/logo.png" alt="NeuroStack Logo" />
          </div>
          <div className="navbar-actions">
            <Link to="/login" className="navbar-actions">Login</Link>
            <Link to="/register" className="navbar-actions">Register</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "#ef4444", textAlign: "center", marginBottom: "1rem" }}>{error}</p>}
            <div className="input-box">
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="input-box">
              <button className="btn" type="submit">Login</button>
            </div>
            <div className="regi-link">
              <p>
                Don't have an account? <br />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/register"); }}>
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;