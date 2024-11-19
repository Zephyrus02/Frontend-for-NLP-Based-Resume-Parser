import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
	return (
		<nav className="navbar">
			<h1 className="navbar-title">Beyond Keywords</h1>
			<div className="navbar-links">
				{isAuthenticated ? (
					<button onClick={onLogout} className="auth-button">
						Logout
					</button>
				) : (
					<Link to="/login" className="auth-button">
						Sign In
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
