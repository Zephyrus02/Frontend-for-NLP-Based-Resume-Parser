import React from 'react';

const Card = ({ company, jobRole, location, link, index }) => {
  return (
    <div className="card">
      <div className="card-icon">
        <span>{company.charAt(0)}</span>
      </div>
      <h3 className="card-title">{company}</h3>
      <p className="card-subtitle">{jobRole}</p>
      <div className="card-detail">{location}</div>
      <div className="card-link">
        <a href={link} target="_blank" rel="noopener noreferrer">Learn More →</a>
      </div>
    </div>
  );
};

export default Card;