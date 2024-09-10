import React from "react";

const Card = ({ company, jobRole, location, link, logo, index }) => {
	return (
		<div className="card" key={index}>
			<div className="card-icon">
				(<span>{company.charAt(0)}</span>)
			</div>
			<h3 className="card-title">{jobRole}</h3>
			<p className="card-subtitle">{company}</p>
			<p className="card-detail">{location}</p>
			<div className="card-link">
				<a href={link} target="_blank" rel="noopener noreferrer">
					View Job →
				</a>
			</div>
		</div>
	);
};

export default Card;
