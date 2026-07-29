import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.jpeg';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [filled, setFilled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setFilled(window.scrollY > 10);
      const sections = ['about', 'services', 'demanded', 'contact'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/get-started');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar ${filled ? 'filled' : ''}`} aria-label="Primary">
        <Link to="/" className="brand" aria-label="Zarvion Technologies home" onClick={closeMenu}>
          <img src={logo} alt="Zarvion Technologies logo" />
          {/* "ZarvionTechnologies" text removed */}
        </Link>

        <ul className="nav-links">
          <li><Link to="/" className={!activeSection ? 'active' : ''}>Home</Link></li>
          <li><a href="/about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="/service" className={activeSection === 'services' ? 'active' : ''}>Services</a></li>
          <li><a href="/demand" className={activeSection === 'demanded' ? 'active' : ''}>Demand IT Roles</a></li>
          <li><a href="/contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>

        <div className="nav-right">
          <ThemeToggle />
          <Link to="/get-started" className="nav-btn" onClick={handleGetStarted}>
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" className={!activeSection ? 'active' : ''} onClick={closeMenu}>Home</Link></li>
          <li><a href="/about" className={activeSection === 'about' ? 'active' : ''} onClick={closeMenu}>About</a></li>
          <li><a href="/service" className={activeSection === 'services' ? 'active' : ''} onClick={closeMenu}>Services</a></li>
          <li><a href="/demand" className={activeSection === 'demanded' ? 'active' : ''} onClick={closeMenu}>Demand IT Roles</a></li>
          <li><a href="/contact" className={activeSection === 'contact' ? 'active' : ''} onClick={closeMenu}>Contact</a></li>
        </ul>

        <div className="mobile-menu-footer">
          <ThemeToggle />
          <Link to="/get-started" className="nav-btn" onClick={handleGetStarted}>
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;