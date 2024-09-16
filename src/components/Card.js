import React from "react";

const Card = ({ company, jobRole, location, link, listDate, index }) => {
	return (
		<div className="card" key={index}>
			<div className="card-icon">
				<strong>{company.charAt(0)}</strong>
			</div>
			<h3 className="card-title">{jobRole}</h3>
			<p className="card-subtitle">{company}</p>
			<p className="card-detail">{location}</p>
			<p className="card-detail">Listed on: {listDate}</p>
			<div className="card-link">
				<a href={link} target="_blank" rel="noopener noreferrer">
					View Job →
				</a>
			</div>
		</div>
	);
};

export default Card;
