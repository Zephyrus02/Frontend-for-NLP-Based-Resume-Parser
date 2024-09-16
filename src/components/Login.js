import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/login", { username, password });
			onLogin();
			navigate("/");
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<div className="auth-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</div>
	);
};

export default Login;
