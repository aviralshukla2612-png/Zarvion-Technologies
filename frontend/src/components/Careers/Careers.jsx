import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OPEN_POSITIONS } from '../../data/careers';
import './Careers.css';

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
const PHONE_DISPLAY = '+1 (302) 364-2356';
const PHONE_HREF = 'tel:+13023642356';
const EMAIL_DISPLAY = 'info@zarviontechnologies.com';
const EMAIL_HREF = 'mailto:info@zarviontechnologies.com';

// Small diagonal arrow used on every hoverable contact row
const ArrowUpRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Careers = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[1]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dropdownRef = useRef(null);

  const hasOpenings = OPEN_POSITIONS.length > 0;

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
      className={`contact-section careers-section ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="contact-wrap">
        <div className="contact-grid">
          {/* Left Column: Info */}
          <div className="contact-info">
            <span className="contact-badge reveal-item" style={{ transitionDelay: '0.05s' }}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L6 21l1.7-7-5.4-4.7 7.1-.6z"/></svg>
              JOIN OUR TEAM
            </span>
            <h2 className="contact-title reveal-item" style={{ transitionDelay: '0.16s' }}>
              Shape Your <br />
              <span>Career With Us</span>
            </h2>
            
            {hasOpenings ? (
              <div className="open-roles-container reveal-item" style={{ transitionDelay: '0.28s' }}>
                <p className="contact-desc" style={{ marginBottom: '48px' }}>
                  We are currently hiring! Select the position you are applying for in the form, drop your resume, and we'll be in touch.
                </p>
              </div>
            ) : (
              <div className="no-openings-alert reveal-item" style={{ transitionDelay: '0.28s' }}>
                <div className="no-openings-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
                </div>
                <div>
                  <h3>No Open Positions</h3>
                  <p>But we are always looking for top talent! Drop your resume below, and we'll reach out when a role opens up.</p>
                </div>
              </div>
            )}

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
            <div className="cta-face">
              <form className="contact-form" onSubmit={(e) => {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                formData.set('phone', `${selectedCountry.code} ${e.target.phone.value}`);

                fetch("/api/careers", {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    setShowSuccess(true);
                    e.target.reset();
                    setSelectedFile(null);
                })
                .catch(error => {
                    console.error("Error submitting form:", error);
                    alert("There was an issue sending your application. Please try again.");
                });
              }}>
                <input type="hidden" name="_subject" value="New Career Application from Zarvion Technologies" />
                <input type="hidden" name="_captcha" value="false" />
                <h3 className="contact-form-title reveal-field" style={{ transitionDelay: '0.05s' }}>
                  Submit Your Resume
                </h3>

                {hasOpenings && (
                  <div className="form-group reveal-field" style={{ transitionDelay: '0.08s' }}>
                    <label htmlFor="position">Position Applying For</label>
                    <div className="custom-select-wrapper">
                      <select id="position" name="position" required className="styled-select">
                        <option value="" disabled selected>Select a position...</option>
                        {OPEN_POSITIONS.map(pos => (
                          <option key={pos.id} value={pos.title}>{pos.title}</option>
                        ))}
                      </select>
                      <div className="select-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group reveal-field" style={{ transitionDelay: '0.1s' }}>
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      placeholder="John Doe" 
                      required 
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[0-9]/g, '');
                      }}
                    />
                  </div>
                  <div className="form-group reveal-field" style={{ transitionDelay: '0.15s' }}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="form-group reveal-field" style={{ transitionDelay: '0.2s', position: 'relative', zIndex: isDropdownOpen ? 100 : 1 }}>
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
                          {COUNTRIES.filter(c => c.code !== selectedCountry.code).map(c => (
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
                      name="phone"
                      placeholder="(555) 123-4567"
                      maxLength="10"
                      required
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }}
                    />
                  </div>
                </div>

                <div className="form-group reveal-field" style={{ transitionDelay: '0.25s' }}>
                  <label htmlFor="resume">Upload Resume (PDF, DOCX, Image)</label>
                  <div className="file-upload-wrapper">
                    <input 
                      type="file" 
                      id="resume" 
                      name="resume"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
                      required 
                      className="file-input-hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setSelectedFile(e.target.files[0].name);
                        } else {
                          setSelectedFile(null);
                        }
                      }}
                    />
                    <label htmlFor="resume" className="file-input-custom">
                      <div className="file-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <span className="file-name">{selectedFile || "Click to select a document"}</span>
                    </label>
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
                  Submit Application
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                </button>
              </form>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
