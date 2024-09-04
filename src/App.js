// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State to control success popup visibility
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to control error popup visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success popup on successful upload
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to upload file.');
      setErrorMessage('Failed to upload file. Please try again.'); // Set the error message
      setShowErrorPopup(true); // Show error popup
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>PDF Upload</h1>
      </nav>

      <div className="container">
        <form onSubmit={handleUpload} className="upload-form">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button type="submit">Upload PDF</button>
        </form>
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
