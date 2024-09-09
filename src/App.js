import React, { useState, useRef } from 'react';
import axios from 'axios';
import Popup, { showToast } from './components/Popup';
import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import Footer from "./components/Footer";
import CardsSection from "./components/CardsSection";
import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Drag files here or click to browse");
  const [showCards, setShowCards] = useState(false);
  const [cards, setCards] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilename(selectedFile ? selectedFile.name : "Drag files here or click to browse");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setFilename(droppedFile ? droppedFile.name : "Drag files here or click to browse");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      showToast("No file selected.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showToast("File uploaded successfully!", "success");

      // Combine job data with logos from the response
      const jobDataWithLogos = response.data.jobs.map((job) => ({
        ...job,
        logo: response.data.companyLogos.find((logo) => logo.company === job.company)?.svgUrl || "",
      }));

      setCards(jobDataWithLogos);
      setShowCards(true);
    } catch (error) {
      showToast("Failed to upload file. Please try again.", "error");
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <section className="hero-section">
          <h1 className="hero-title">Make Your Job Search <span>Easier</span></h1>
          <p className="hero-subtitle">Upload your resume and find matching job opportunities</p>
        </section>
        <form onSubmit={handleUpload} className="upload-form">
          <UploadBox filename={filename} onFileChange={handleFileChange} onDrop={handleDrop} />
          <button type="submit" className="upload-button">
            Upload PDF
          </button>
        </form>

        {showCards && <CardsSection cards={cards} />}
      </div>

      <Popup />
      <Footer />
    </div>
  );
};

export default App;
