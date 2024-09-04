// src/App.js

import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('Drop files here'); // New state for filename
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCards, setShowCards] = useState(false); // New state for showing cards
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilename(selectedFile ? selectedFile.name : 'Drop files here'); // Update filename state
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setFilename(droppedFile ? droppedFile.name : 'Drop files here'); // Update filename state
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('No file selected.');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowSuccessPopup(true);
      setShowCards(true); // Show cards after successful upload
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (error) {
      setErrorMessage('Failed to upload file. Please try again.');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
    }
  };

  const cards = [
    { company: 'Company A', jobRole: 'Software Engineer', location: 'New York, NY', ctc: '$120,000' },
    { company: 'Company B', jobRole: 'Data Scientist', location: 'San Francisco, CA', ctc: '$140,000' },
    { company: 'Company C', jobRole: 'Product Manager', location: 'Austin, TX', ctc: '$130,000' },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <h1>PDF Upload</h1>
      </nav>

      <div className="container">
        <form onSubmit={handleUpload} className="upload-form">
          {/* Full Width File Upload Box */}
          <div
            className="upload-box"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClick} // Add click handler
          >
            <div className="upload-icon">
              {/* Inline SVG for a file icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffdd00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-file"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"></path>
                <line x1="14" y1="2" x2="14" y2="8"></line>
                <line x1="6" y1="14" x2="18" y2="14"></line>
                <line x1="6" y1="18" x2="18" y2="18"></line>
              </svg>
            </div>
            <p>{filename}</p> {/* Display filename or default text */}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              ref={fileInputRef} // Attach ref to the file input
              className="file-input"
            />
          </div>
          <button type="submit" className="upload-button">Upload PDF</button>
        </form>

        {/* New Section with Cards */}
        {showCards && (
          <section className="cards-section">
            {cards.map((card, index) => (
              <div
                key={index}
                className="card"
                style={{ animationDelay: `${index * 0.3}s` }} // Apply delay based on index
              >
                <h2 className="card-title">{card.company}</h2>
                <div className="card-details">
                  <div className="card-detail">
                    <strong>Job Role:</strong> {card.jobRole}
                  </div>
                  <div className="card-detail">
                    <strong>Location:</strong> {card.location}
                  </div>
                  <div className="card-detail">
                    <strong>CTC:</strong> {card.ctc}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Success Popup Notification */}
      {showSuccessPopup && (
        <div className="popup success">
          <p>File uploaded successfully!</p>
          <div className="popup-timer"></div>
        </div>
      )}

      {/* Error Popup Notification */}
      {showErrorPopup && (
        <div className="popup error">
          <p>{errorMessage}</p>
          <div className="popup-timer"></div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2024 PDF Uploader</p>
      </footer>
    </div>
  );
};

export default App;
