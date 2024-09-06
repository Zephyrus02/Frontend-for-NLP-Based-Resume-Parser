import React, { useRef } from 'react';

const UploadBox = ({ filename, onFileChange, onDrop }) => {
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
      onClick={handleBoxClick}
    >
      <div className="upload-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="fileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-purple)" />
              <stop offset="100%" stopColor="var(--accent-pink)" />
            </linearGradient>
          </defs>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="url(#fileGradient)" />
          <polyline points="14 2 14 8 20 8" stroke="url(#fileGradient)" />
          <line x1="12" y1="18" x2="12" y2="12" stroke="url(#fileGradient)" />
          <line x1="9" y1="15" x2="15" y2="15" stroke="url(#fileGradient)" />
        </svg>
      </div>
      <p>{filename}</p>
      <input
        type="file"
        accept="application/pdf"
        onChange={onFileChange}
        ref={fileInputRef}
        className="file-input"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UploadBox;