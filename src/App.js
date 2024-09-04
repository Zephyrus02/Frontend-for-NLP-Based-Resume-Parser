import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to upload file.');
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
        {message && <p className="message">{message}</p>}
      </div>

      <footer className="footer">
        <p>&copy; 2024 PDF Uploader</p>
      </footer>
    </div>
  );
};

export default App;
