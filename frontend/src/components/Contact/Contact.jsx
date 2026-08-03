import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const COUNTRIES = [
  { code: '+91', iso: 'in' },
  { code: '+1', iso: 'us' },
  { code: '+44', iso: 'gb' },
  { code: '+61', iso: 'au' },
  { code: '+81', iso: 'jp' },
  { code: '+971', iso: 'ae' },
];

const OFFICE_ADDRESS = 'Plot No.71, 4th Floor, Silicon Avenue, Hitech City, Madhapur, Hyderabad, Telangana 500081, India';
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`;
const APPLE_MAP_URL = `http://maps.apple.com/?q=${encodeURIComponent(OFFICE_ADDRESS)}`;
const PHONE_DISPLAY = '+91 7890012345';
const PHONE_HREF = 'tel:+917890012345';
const EMAIL_DISPLAY = 'hello@zarviontechnologies.com';
const EMAIL_HREF = 'mailto:hello@zarviontechnologies.com';

// Small diagonal arrow used on every hoverable contact row
const ArrowUpRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Contact = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Left column: fade/slide the info items in whenever the section scrolls
  // into view (and re-arms if you scroll away and back).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`contact-section ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="contact-wrap">
        <div className="contact-grid">
          {/* Left Column: Info */}
          <div className="contact-info">
            <span className="contact-badge reveal-item" style={{ transitionDelay: '0.05s' }}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L6 21l1.7-7-5.4-4.7 7.1-.6z"/></svg>
              GET IN TOUCH
            </span>
            <h2 className="contact-title reveal-item" style={{ transitionDelay: '0.16s' }}>
              Let's Build the <br />
              <span>Future Together</span>
            </h2>
            <p className="contact-desc reveal-item" style={{ transitionDelay: '0.28s' }}>
              Let's connect today and discuss about your futuristic growth.
            </p>

            <div className="contact-details">
              {/* Phone — now a tel: link with the same hover treatment as Office */}
              <a
                className="contact-item contact-item-link reveal-item"
                style={{ transitionDelay: '0.4s' }}
                href={PHONE_HREF}
                aria-label={`Call ${PHONE_DISPLAY}`}
              >
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div className="contact-item-body">
                  <h4>Phone</h4>
                  <p>{PHONE_DISPLAY}</p>
                  <span className="contact-item-cta">
                    Tap to call
                    {ArrowUpRight}
                  </span>
                </div>
              </a>

              {/* Email — now a mailto: link with the same hover treatment as Office */}
              <a
                className="contact-item contact-item-link reveal-item"
                style={{ transitionDelay: '0.52s' }}
                href={EMAIL_HREF}
                aria-label={`Email ${EMAIL_DISPLAY}`}
              >
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div className="contact-item-body">
                  <h4>Email</h4>
                  <p>{EMAIL_DISPLAY}</p>
                  <span className="contact-item-cta">
                    Send an email
                    {ArrowUpRight}
                  </span>
                </div>
              </a>

              {/* Office Address – link to Google and Apple Maps */}
              <div
                className="contact-item contact-item-link reveal-item"
                style={{ transitionDelay: '0.64s' }}
              >
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="contact-item-body">
                  <h4>Office</h4>
                  <p>{OFFICE_ADDRESS}</p>
                  <span className="contact-item-cta" style={{ display: 'flex', gap: '16px' }}>
                    <a href={MAP_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Google Maps {ArrowUpRight}
                    </a>
                    <a href={APPLE_MAP_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Apple Maps {ArrowUpRight}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
               RIGHT COLUMN — hover-reveal card. Front face shows the CTA,
               back face shows the form. Hovering (or focusing a field via
               keyboard) cross-fades + flips from one to the other, with an
               animated rotating-gradient border and glow that intensify
               on hover for extra polish.
               ============================================================ */}
          <div
            className="contact-cta-panel reveal-item"
            style={{ transitionDelay: '0.2s' }}
            tabIndex={0}
          >
            <span className="contact-cta-border" aria-hidden="true" />
            <div className="contact-cta-glow" aria-hidden="true" />
            <div className="contact-cta-glow contact-cta-glow-2" aria-hidden="true" />

            {/* The form container */}
            <div className="cta-face">
              {showSuccess ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h4>Message Sent!</h4>
                  <p>We've received your request. Our team will get back to you shortly.</p>
                  <button 
                    className="contact-success-btn" 
                    onClick={() => navigate('/')}
                  >
                    Return to Home Page
                  </button>
                </div>
              ) : (
              <form className="contact-form" onSubmit={(e) => {
                e.preventDefault();
                setShowSuccess(true);
                e.target.reset();
              }}>
                <h3 className="reveal-field" style={{ transitionDelay: '0.05s' }}>
                  Let's Build Together
                </h3>

                <div className="form-row">
                  <div className="form-group reveal-field" style={{ transitionDelay: '0.1s' }}>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" placeholder="John Doe" required />
                  </div>
                  <div className="form-group reveal-field" style={{ transitionDelay: '0.15s' }}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div 
                  className="form-group reveal-field" 
                  style={{ transitionDelay: '0.25s', position: 'relative', zIndex: isDropdownOpen ? 100 : 1 }}
                >
                  <label htmlFor="phone">Phone</label>
                  <div className="phone-input-group">
                    <div className="custom-country-select" ref={dropdownRef}>
                      <div 
                        className="country-select-trigger" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} alt={selectedCountry.iso} />
                        <span>{selectedCountry.code}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`chevron ${isDropdownOpen ? 'open' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                      
                      {isDropdownOpen && (
                        <div className="country-select-dropdown">
                          {COUNTRIES.map(c => (
                            <div 
                              key={c.code} 
                              className="country-option"
                              onClick={() => {
                                setSelectedCountry(c);
                                setIsDropdownOpen(false);
                              }}
                            >
                              <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt={c.iso} />
                              <span>{c.code}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input 
                      type="tel" 
                      id="phone" 
                      placeholder="98765 43210"
                      maxLength="10"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }}
                    />
                  </div>
                </div>

                <div className="form-group reveal-field" style={{ transitionDelay: '0.3s' }}>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tell us about how we can help you..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn reveal-field" style={{ transitionDelay: '0.35s' }}>
                  Let's Build Together
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;