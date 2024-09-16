import React, { useState } from "react";
import axios from "axios";
import Popup, { showToast } from "./components/Popup";
import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import Footer from "./components/Footer";
import CardsSection from "./components/CardsSection";
import "./App.css";
import FilterOptions from "./components/FilterOptions";

const App = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Drag files here or click to browse");
  const [showCards, setShowCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filters, setFilters] = useState({
    company: "",
    location: "",
    listDate: "",
  });

  // Handles file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilename(selectedFile ? selectedFile.name : "Drag files here or click to browse");
  };

  // Handles file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setFilename(droppedFile ? droppedFile.name : "Drag files here or click to browse");
  };

  // Handles file upload
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

      // Set job data from the server response
      setCards(response.data.jobs);  // Set cards to the jobs returned by the server
      setShowCards(true);
      setFilteredCards(response.data.jobs);  // Set filtered cards to the jobs returned by the server
    } catch (error) {
      showToast("Failed to upload file. Please try again.", "error");
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = cards.filter((card) => {
      return (
        card.company.toLowerCase().includes(newFilters.company.toLowerCase()) &&
        card.location.toLowerCase().includes(newFilters.location.toLowerCase()) &&
        (newFilters.listDate === "" || card.list_date === newFilters.listDate)
      );
    });
    setFilteredCards(filtered);
  };

  return (
    <div className="app">
      <Navbar />
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
          />
          <button type="submit" className="upload-button">
            Upload PDF
          </button>
        </form>

        {showCards && (
          <>
            <FilterOptions filters={filters} onFilterChange={handleFilterChange} />
            <CardsSection cards={filteredCards} />
          </>
        )}
      </div>

      <Popup />
      <Footer />
    </div>
  );
};

export default App;
