import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Import Font Awesome icons
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="navbar-logo">
          <img src="/src/assets/logo.png" alt="NeuroStack Logo" style={{ maxWidth: "200px", height: "auto" }} /> {/* Logo placeholder */}
        </Link>
        {user ? (
          <div className="navbar-actions">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaUser className="icon" color="#fff" /> {/* White icon for contrast */}
              <span style={{ fontSize: "16px", fontWeight: "600", color: "#fff" }}>{user.role}</span> {/* White text for contrast */}
            </div>
            <button
              onClick={logout}
              className="navbar-actions"
            >
              <FaSignOutAlt className="icon" color="#fff" /> {/* White icon for contrast */}
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="navbar-actions">
            <FaUser className="icon" color="#fff" /> {/* White icon for contrast */}
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;