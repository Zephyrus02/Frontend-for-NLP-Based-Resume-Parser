import React, { useRef } from 'react';

const UploadBox = ({ filename, onFileChange, onDrop, onClick }) => {
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="upload-box"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleBoxClick} // Use handleBoxClick for box click
    >
      <div className="upload-icon">
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
      <p>{filename}</p>
      <input
        type="file"
        accept="application/pdf"
        onChange={onFileChange}
        ref={fileInputRef} // Attach ref to the file input
        className="file-input"
        style={{ display: 'none' }} // Hide the file input
      />
    </div>
  );
};

export default UploadBox;
