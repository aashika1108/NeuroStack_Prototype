import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="navbar-logo">
          <img src="/src/assets/logo.png" alt="NeuroStack Logo" />
        </Link>
        <div className="navbar-actions">
          {user ? (
            <>
              <div className="flex items-center gap-2" style={{ color: '#fff' }}>
                <FaUser size={18} />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>{user.role}</span>
              </div>
              <button onClick={logout} className="navbar-actions">
                <FaSignOutAlt size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-actions">
              <FaUser size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;