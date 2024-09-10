import React from 'react';
import Card from './Card';

const CardsSection = ({ cards = [] }) => {
  return (
    <section className="cards-section">
      {cards.map((card, index) => (
        <Card
          key={index}
          company={card.company}
          jobRole={card.job_title}
          location={card.location}
          link={card.job_url}
          index={index}
        />
      ))}
    </section>
  );
};

export default CardsSection;
