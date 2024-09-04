import React from 'react';
import Card from './Card';

const CardsSection = ({ cards }) => {
  return (
    <section className="cards-section">
      {cards.map((card, index) => (
        <Card
          key={index}
          company={card.company}
          jobRole={card.jobRole}
          location={card.location}
          ctc={card.ctc}
          index={index}
        />
      ))}
    </section>
  );
};

export default CardsSection;
