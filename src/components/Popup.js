import React from 'react';

const Popup = ({ message, type, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={`popup ${type}`}>
      <p>{message}</p>
      <div className="popup-timer"></div>
    </div>
  );
};

export default Popup;
