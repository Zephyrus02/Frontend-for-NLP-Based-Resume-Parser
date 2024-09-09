import React, { useState, useEffect } from 'react';
import Card from './Card';

const CardsSection = ({ cards = [] }) => {
  const [cardsWithLogos, setCardsWithLogos] = useState(cards);

  useEffect(() => {
    const fetchCompanyLogos = async () => {
      const uniqueCompanies = [...new Set(cards.map(card => card.company))];
      const Brand_API_Key = process.env.REACT_APP_BRAND_API_KEY;
      const Brand_API_Endpoint = process.env.REACT_APP_BRAND_API_ENDPOINT;

      const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${Brand_API_Key}` },
      };

      try {
        const logoPromises = uniqueCompanies.map(async (company) => {
          const response = await fetch(
            `${Brand_API_Endpoint}/${company}.com`,
            options
          );
          const data = await response.json();
          const firstLogo = data.logos[0];
          const firstSvg = firstLogo.formats.find(
            (format) => format.format === 'svg'
          );
          return { company, svgUrl: firstSvg.src };
        });

        const companyLogos = await Promise.all(logoPromises);
        
        const updatedCards = cards.map(card => ({
          ...card,
          logo: companyLogos.find(logo => logo.company === card.company)?.svgUrl || ''
        }));
        
        setCardsWithLogos(updatedCards);
      } catch (error) {
        console.error('Error fetching company logos:', error);
      }
    };

    fetchCompanyLogos();
  }, [cards]);

  return (
    <section className="cards-section">
      {cardsWithLogos.map((card, index) => (
        <Card
          key={index}
          company={card.company}
          jobRole={card.job_title}
          location={card.location}
          link={card.job_url}
          logo={card.logo}
          index={index}
        />
      ))}
    </section>
  );
};

export default CardsSection;
