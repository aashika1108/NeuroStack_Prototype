import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Using the simplified, modern CSS

const Register = () => {
  const [isActive, setIsActive] = useState(true); // Kept for potential future use, though not currently active
  const navigate = useNavigate();

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleSignInClick = () => {
    navigate("/login");
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
          <h2>Register</h2>
          <form action="#">
            <div className="input-box">
              <input type="text" required />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="email" required />
              <label>Email</label>
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input type="password" required />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="input-box">
              <button className="btn" type="submit">Register</button>
            </div>
            <div className="regi-link">
              <p>
                Already have an account? <br />
                <a href="#" onClick={(e) => { e.preventDefault(); handleSignInClick(); }}>
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;