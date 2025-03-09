import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="navbar">
      <h2>NeuroStack</h2>
      {token && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Navbar;