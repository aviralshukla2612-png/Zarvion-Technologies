import React from 'react';
import './Contact.css';

const OFFICE_ADDRESS = 'Plot No.71, 4th Floor, Silicon Avenue, Hitech City, Madhapur, Hyderabad, Telangana 500081, India';
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`;

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-wrap">
        <div className="contact-grid">
          {/* Left Column: Info */}
          <div className="contact-info">
            <span className="contact-badge">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L6 21l1.7-7-5.4-4.7 7.1-.6z"/></svg>
              GET IN TOUCH
            </span>
            <h2 className="contact-title">
              Let's Build the <br />
              <span>Future Together</span>
            </h2>
            <p className="contact-desc">
              Have a project in mind or want to explore how we can help transform your ideas into reality? We'd love to hear from you.
            </p>

            <div className="contact-details">
              {/* Phone */}
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 7890012345</p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>hello@zarviontechnologies.com</p>
                </div>
              </div>

              {/* Office Address – link to Google Maps */}
              <a
                className="contact-item contact-item-link"
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open office address in Google Maps"
              >
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="contact-item-body">
                  <h4>Office</h4>
                  <p>{OFFICE_ADDRESS}</p>
                  <span className="contact-item-cta">
                    Open in Google Maps
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <h3>Let's Build Together</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input type="text" id="company" placeholder="Your Company" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="project">Project Details</label>
                <textarea
                  id="project"
                  rows="4"
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements…"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Let's Build Together
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;