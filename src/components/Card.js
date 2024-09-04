import React from 'react';

const Card = ({ company, jobRole, location, ctc, index }) => {
  return (
    <div
      className="card"
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      <h2 className="card-title">{company}</h2>
      <div className="card-details">
        <div className="card-detail">
          <strong>Job Role:</strong> {jobRole}
        </div>
        <div className="card-detail">
          <strong>Location:</strong> {location}
        </div>
        <div className="card-detail">
          <strong>CTC:</strong> {ctc}
        </div>
      </div>
    </div>
  );
};

export default Card;
