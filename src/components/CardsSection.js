import React from 'react';
import Card from './Card';

const CardsSection = ({ cards = [] }) => {
  if (cards.length === 0) {
    return (
      <section className="cards-section">
        <div className="no-jobs-message">
          <p>No jobs currently available matching your filters.</p>
          <p>Try adjusting your filter criteria or check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="cards-section">
      {cards.map((card, index) => (
        <Card
          key={index}
          company={card.company}
          jobRole={card.job_title}
          location={card.location}
          link={card.job_url}
          listDate={card.list_date}
          index={index}
        />
      ))}
    </section>
  );
};

export default CardsSection;
