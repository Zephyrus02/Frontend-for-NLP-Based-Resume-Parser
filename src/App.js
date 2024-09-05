import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import Popup from "./components/Popup";
import Footer from "./components/Footer";
import CardsSection from "./components/CardsSection";
import "./App.css";

const App = () => {
	const [file, setFile] = useState(null);
	const [filename, setFilename] = useState("Drag files here or click to browse");
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showCards, setShowCards] = useState(false);
	const fileInputRef = useRef(null);

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
			setErrorMessage("No file selected.");
			setShowErrorPopup(true);
			setTimeout(() => setShowErrorPopup(false), 3000);
			return;
		}

		const formData = new FormData();
		formData.append("pdf", file);

		try {
			await axios.post("http://localhost:5000/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setShowSuccessPopup(true);
			setShowCards(true);
			setTimeout(() => setShowSuccessPopup(false), 3000);
		} catch (error) {
			setErrorMessage("Failed to upload file. Please try again.");
			setShowErrorPopup(true);
			setTimeout(() => setShowErrorPopup(false), 3000);
		}
	};

	const cards = [
		{
			company: "Company A",
			jobRole: "Software Engineer",
			location: "New York, NY",
			ctc: "$120,000",
		},
		{
			company: "Company B",
			jobRole: "Data Scientist",
			location: "San Francisco, CA",
			ctc: "$140,000",
		},
		{
			company: "Company C",
			jobRole: "Product Manager",
			location: "Austin, TX",
			ctc: "$130,000",
		},
	];

	return (
		<div className="app">
			<Navbar />
			<div className="container">
				<form onSubmit={handleUpload} className="upload-form">
					<UploadBox
						filename={filename}
						onFileChange={handleFileChange}
						onDrop={handleDrop}
					/>
					<button type="submit" className="upload-button">
						Upload PDF
					</button>
				</form>

				{showCards && <CardsSection cards={cards} />}
			</div>

			<Popup
				message="File uploaded successfully!"
				type="success"
				isVisible={showSuccessPopup}
			/>

			<Popup message={errorMessage} type="error" isVisible={showErrorPopup} />

			<Footer />
		</div>
	);
};

export default App;
