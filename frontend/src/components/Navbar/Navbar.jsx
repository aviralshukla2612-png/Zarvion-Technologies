import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.jpeg';
import './Navbar.css';

const Navbar = () => {
  const [filled, setFilled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false); // mobile dropdown toggle
  const closeTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

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
    const handleKey = (e) => { if (e.key === 'Escape') { setMenuOpen(false); setRolesOpen(false); } };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/contact');
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setRolesOpen(false);
  };

  // Small delay so moving the mouse from trigger -> submenu doesn't
  // instantly collapse the dropdown.
  const openRolesDesktop = () => {
    clearTimeout(closeTimer.current);
    setRolesOpen(true);
  };
  const closeRolesDesktop = () => {
    closeTimer.current = setTimeout(() => setRolesOpen(false), 150);
  };

  return (
    <>
      <nav className={`navbar ${filled ? 'filled' : ''}`} aria-label="Primary">
        <Link to="/" className="brand" aria-label="Zarvion Technologies home" onClick={closeMenu}>
          <img src={logo} alt="Zarvion Technologies logo" />
        </Link>

        <ul className="nav-links">
          <li><Link to="/" className={(path === '/' && !activeSection) ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={(path === '/about' || (path === '/' && activeSection === 'about')) ? 'active' : ''}>About</Link></li>
          <li><Link to="/service" className={(path.startsWith('/service') || (path === '/' && activeSection === 'services')) ? 'active' : ''}>Services</Link></li>

          <li
            className="nav-dropdown"
            onMouseEnter={openRolesDesktop}
            onMouseLeave={closeRolesDesktop}
          >
            <span
              className={`dropdown-trigger ${(path === '/it-roles' || path === '/non-it-roles' || (path === '/' && activeSection === 'demanded')) ? 'active' : ''} ${rolesOpen ? 'open' : ''}`}
              tabIndex={0}
              onFocus={openRolesDesktop}
              onBlur={closeRolesDesktop}
            >
              Career Roles
              <svg className="dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>

            <ul className={`dropdown-menu ${rolesOpen ? 'open' : ''}`}>
              <li>
                <Link to="/it-roles" onClick={closeMenu}>
                  IT Roles
                  <span className="dropdown-sub">Software, cloud, AI &amp; more</span>
                </Link>
              </li>
              <li>
                <Link to="/non-it-roles" onClick={closeMenu}>
                  Non-IT Roles
                  <span className="dropdown-sub">Marketing, sales, HR &amp; more</span>
                </Link>
              </li>
            </ul>
          </li>

          <li><Link to="/blog" className={path.startsWith('/blog') ? 'active' : ''}>Blog</Link></li>
        </ul>

        <div className="nav-right">
          <Link to="/contact" className="nav-btn" onClick={handleContactClick}>
            Contact
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
          <li><Link to="/" className={(path === '/' && !activeSection) ? 'active' : ''} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" className={(path === '/about' || (path === '/' && activeSection === 'about')) ? 'active' : ''} onClick={closeMenu}>About</Link></li>
          <li><Link to="/service" className={(path.startsWith('/service') || (path === '/' && activeSection === 'services')) ? 'active' : ''} onClick={closeMenu}>Services</Link></li>

          <li className="mobile-dropdown">
            <button
              type="button"
              className={`mobile-dropdown-trigger ${(path === '/it-roles' || path === '/non-it-roles' || (path === '/' && activeSection === 'demanded')) ? 'active' : ''} ${rolesOpen ? 'open' : ''}`}
              onClick={() => setRolesOpen((prev) => !prev)}
              aria-expanded={rolesOpen}
            >
              Career Roles
              <svg className="dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <ul className={`mobile-dropdown-menu ${rolesOpen ? 'open' : ''}`}>
              <li><Link to="/it-roles" onClick={closeMenu}>IT Roles</Link></li>
              <li><Link to="/non-it-roles" onClick={closeMenu}>Non-IT Roles</Link></li>
            </ul>
          </li>

          <li><Link to="/blog" className={path.startsWith('/blog') ? 'active' : ''} onClick={closeMenu}>Blog</Link></li>
        </ul>

        <div className="mobile-menu-footer">
          <Link to="/contact" className="nav-btn" onClick={handleContactClick}>
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;