import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">NLP Resume Parser</h1>
      <div className="navbar-links">
        {isAuthenticated ? (
          <button onClick={onLogout} className="auth-button">Logout</button>
        ) : (
          <>
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;