import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = ({ year = 2024, name = 'Zephyrus02' }) => {
  return (
    <footer className="footer" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
    }}>
      <p>&copy; {year} {name}</p>
      <div className="social-icons" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '10px',
      }}>
        <a href="https://github.com/Zephyrus02" aria-label="GitHub">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/aneesh-raskar/" aria-label="LinkedIn">
          <FaLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  year: PropTypes.number,
  name: PropTypes.string,
};

export default Footer;