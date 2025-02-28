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
        <Link to="/dashboard" className="navbar-brand">
          NeuroStack
        </Link>
        {user ? (
          <div className="navbar-actions">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaUser className="icon" color="#fff" /> {/* Use FaUser with 24px size */}
              <span style={{ fontSize: "16px", fontWeight: "600" }}>{user.role}</span>
            </div>
            <button
              onClick={logout}
              className="navbar-actions"
            >
              <FaSignOutAlt className="icon" color="#fff" /> {/* Use FaSignOutAlt with 24px size */}
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="navbar-actions">
            <FaUser className="icon" color="#fff" /> {/* Use FaUser with 24px size */}
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;