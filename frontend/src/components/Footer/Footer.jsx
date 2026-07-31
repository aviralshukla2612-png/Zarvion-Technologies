import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import logo from '../../assets/images/logo.jpeg';
import textLogo from '../../assets/images/ZARVION-TECHNOLOGIES-Font.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Wavy Background Effect */}
      <div className="footer-waves">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#2F80FF', stopOpacity: 0.08 }} />
              <stop offset="50%" style={{ stopColor: '#5AA8FF', stopOpacity: 0.04 }} />
              <stop offset="100%" style={{ stopColor: '#2F80FF', stopOpacity: 0.08 }} />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#5AA8FF', stopOpacity: 0.06 }} />
              <stop offset="50%" style={{ stopColor: '#2F80FF', stopOpacity: 0.03 }} />
              <stop offset="100%" style={{ stopColor: '#5AA8FF', stopOpacity: 0.06 }} />
            </linearGradient>
          </defs>
          <path className="wave wave1" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <path className="wave wave2" d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,245.3C672,256,768,256,864,245.3C960,235,1056,213,1152,213.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <path className="wave wave3" d="M0,288L48,277.3C96,267,192,245,288,245.3C384,245,480,267,576,277.3C672,288,768,288,864,277.3C960,267,1056,245,1152,245.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      <div className="footer-wrap">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Zarvion Logo" className="logo-icon" />
              <img src={textLogo} alt="Zarvion Technologies" className="logo-text" />
            </Link>

            <p className="footer-tagline">Empowering Careers. Connecting Futures.</p>

            <p className="footer-desc">
              Get started today and meet with Empowering ambitious professionals with world-class career opportunities and cutting-edge IT solutions.
            </p>

            <div className="social-links">
              <a href="#" aria-label="X (Twitter)"><FiTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/service">Our Services</Link></li>
              <li><Link to="/demand">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Documentation</a></li>
            </ul>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Zarvion Technologies. All rights reserved.</p>
          <div className="footer-bottom-links">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;