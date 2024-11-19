import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup, { showToast } from "./components/Popup";
import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import Footer from "./components/Footer";
import CardsSection from "./components/CardsSection";
import "./App.css";
import FilterOptions from "./components/FilterOptions";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

axios.defaults.withCredentials = true;

const App = () => {
	const [file, setFile] = useState(null);
	const [filename, setFilename] = useState(
		"Drag files here or click to browse"
	);
	const [showCards, setShowCards] = useState(false);
	const [cards, setCards] = useState([]);
	const [filteredCards, setFilteredCards] = useState([]);
	const [filters, setFilters] = useState({
		company: "",
		location: "",
		listDate: "",
	});
	const [suitedJobRole, setSuitedJobRole] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			const response = await axios.get("http://localhost:5000/check-auth");
			setIsAuthenticated(response.data.isAuthenticated);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	const handleLogin = () => {
		setIsAuthenticated(true);
	};

	const handleLogout = async () => {
		try {
			await axios.post("http://localhost:5000/logout");
			setIsAuthenticated(false);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		setFilename(
			selectedFile ? selectedFile.name : "Drag files here or click to browse"
		);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		setFile(droppedFile);
		setFilename(
			droppedFile ? droppedFile.name : "Drag files here or click to browse"
		);
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		if (!file) {
			showToast("No file selected.", "error");
			return;
		}

		setIsLoading(true); // Set loading state to true

		const formData = new FormData();
		formData.append("pdf", file);

		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				"http://localhost:5000/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			showToast("File uploaded successfully!", "success");

			setCards(response.data.jobs);
			setShowCards(true);
			setFilteredCards(response.data.jobs);
			setSuitedJobRole(response.data.job_title);
		} catch (error) {
			console.error("Upload error:", error);
			showToast("Failed to upload file. Please try again.", "error");
		} finally {
			setIsLoading(false); // Set loading state to false
		}
	};

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
		// Apply filters to cards
		const filtered = cards.filter((card) => {
			return (
				card.company.toLowerCase().includes(newFilters.company.toLowerCase()) &&
				card.location
					.toLowerCase()
					.includes(newFilters.location.toLowerCase()) &&
				(newFilters.listDate === "" || card.list_date >= newFilters.listDate)
			);
		});
		setFilteredCards(filtered);
	};

	return (
		<Router>
			<div className="app">
				<Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
				<div className="main-content">
					<Routes>
						<Route path="/login" element={<Login onLogin={handleLogin} />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/"
							element={
								<div className="container">
									<section className="hero-section">
										<h1 className="hero-title">
											Make Your Job Search <span>Easier</span>
										</h1>
										<p className="hero-subtitle">
											Upload your resume and find matching job opportunities
										</p>
									</section>
									<form onSubmit={handleUpload} className="upload-form">
										<UploadBox
											filename={filename}
											onFileChange={handleFileChange}
											onDrop={handleDrop}
											isAuthenticated={isAuthenticated}
											isLoading={isLoading} // Pass loading state
										/>
										{isAuthenticated && (
											<button type="submit" className="upload-button">
												{isLoading ? "Processing..." : "Upload PDF"}
											</button>
										)}
									</form>

									{showCards && (
										<>
											{suitedJobRole && (
												<div className="suited-job-role">
													<h2>
														<span>{suitedJobRole}</span>
													</h2>
												</div>
											)}
											<FilterOptions
												filters={filters}
												onFilterChange={handleFilterChange}
											/>
											<CardsSection cards={filteredCards} />
										</>
									)}
								</div>
							}
						/>
					</Routes>
				</div>
				<Popup />
				<Footer />
			</div>
		</Router>
	);
};

export default App;
