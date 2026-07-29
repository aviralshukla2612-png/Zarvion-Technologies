// ============================================================
// ServiceDetails.jsx — Zarvion Technologies
// Dynamic service details page
// ============================================================

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getServiceBySlug } from '../../data/services';
import './ServiceDetails.css';

const ServiceDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Scroll animations using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Stats counter animation
  useEffect(() => {
    const animateStats = () => {
      const statElements = document.querySelectorAll('.stat-number');
      statElements.forEach((el) => {
        const target = parseInt(el.dataset.target);
        if (!target) return;
        let current = 0;
        const increment = target / 40;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          const suffix = el.dataset.suffix || '';
          el.textContent = Math.round(current).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
        }, 30);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  if (!service) {
    return (
      <div className="service-not-found">
        <div className="service-not-found-content">
          <h1>Service Not Found</h1>
          <p>We couldn't find the service you're looking for.</p>
          <Link to="/service" className="service-not-found-btn">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="service-details-page" style={{ '--accent': service.accent, '--accent-dim': service.accentDim }}>

      {/* ============================================================
           HERO SECTION
           ============================================================ */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <div className="service-hero-glow" />
          <div className="service-hero-glow service-hero-glow--2" />
        </div>

        <div className="service-hero-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="service-hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
              }}
            />
          ))}
        </div>

        <div className="service-hero-content">
          <div className="service-hero-icon">
            <span className="service-hero-icon-emoji">{service.heroImage}</span>
            <div className="service-hero-icon-ring" />
            <div className="service-hero-icon-ring service-hero-icon-ring--2" />
          </div>

          <div className="service-hero-text">
            <span className="service-hero-badge">{service.title}</span>
            <h1 className="service-hero-title">{service.subtitle}</h1>
            <p className="service-hero-desc">{service.description}</p>

            <div className="service-hero-ctas">
              <button 
                onClick={handleGetStarted}
                className="service-hero-cta service-hero-cta--primary"
              >
                Get Started
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="service-hero-stats">
              {service.stats.map((stat, i) => (
                <div key={i} className="service-hero-stat">
                  <span className="service-hero-stat-num">{stat.value}</span>
                  <span className="service-hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="service-hero-scroll">
          <span>Scroll</span>
          <div className="service-hero-scroll-line" />
        </div>
      </section>

      {/* ============================================================
           OVERVIEW SECTION
           ============================================================ */}
      <section id="overview" className="overview-section">
        <div className="overview-content animate-on-scroll">
          <span className="section-badge">Overview</span>
          <h2 className="section-title">What You'll Get</h2>
          <p className="section-desc">{service.overview}</p>
        </div>
      </section>

      {/* ============================================================
           STATISTICS SECTION
           ============================================================ */}
      <section className="stats-section">
        <div className="stats-grid">
          {service.stats.map((stat, i) => (
            <div key={i} className="stats-item animate-on-scroll" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="stats-number">
                <span className="stat-number" data-target={parseInt(stat.value)} data-suffix={stat.value.includes('%') ? '%' : '+'}>
                  0
                </span>
              </div>
              <div className="stats-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           BENEFITS SECTION
           ============================================================ */}
      <section className="benefits-section">
        <div className="section-header">
          <span className="section-badge">Benefits</span>
          <h2 className="section-title">Why Choose <span className="section-title-accent">Zarvion</span></h2>
        </div>

        <div className="benefits-grid">
          {service.benefits.map((benefit, i) => (
            <div key={i} className="benefits-card animate-on-scroll" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="benefits-card-icon">✦</div>
              <p className="benefits-card-text">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           FEATURES SECTION
           ============================================================ */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2 className="section-title">What's <span className="section-title-accent">Included</span></h2>
        </div>

        <div className="features-grid">
          {service.features.map((feature, i) => (
            <div key={i} className="features-card animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="features-card-icon">✓</div>
              <p className="features-card-text">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           PROCESS TIMELINE
           ============================================================ */}
      <section className="process-section">
        <div className="section-header">
          <span className="section-badge">Process</span>
          <h2 className="section-title">How It <span className="section-title-accent">Works</span></h2>
        </div>

        <div className="process-timeline">
          {service.process.map((item, i) => (
            <div key={i} className="process-item animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="process-item-dot">{i + 1}</div>
              <div className="process-item-content">
                <h3 className="process-item-title">{item.step}</h3>
                <p className="process-item-desc">{item.desc}</p>
                {i < service.process.length - 1 && <div className="process-item-line" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           TESTIMONIALS
           ============================================================ */}
      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">Real <span className="section-title-accent">Results</span></h2>
        </div>

        <div className="testimonials-grid">
          {service.testimonials.map((testimonial, i) => (
            <div key={i} className="testimonials-card animate-on-scroll" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="testimonials-quote">❝</div>
              <p className="testimonials-text">{testimonial.quote}</p>
              <div className="testimonials-author">
                <div className="testimonials-author-name">{testimonial.name}</div>
                <div className="testimonials-author-role">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           FAQ ACCORDION
           ============================================================ */}
      <section className="faq-section">
        <div className="section-header">
          <span className="section-badge">FAQ</span>
          <h2 className="section-title">Frequently Asked <span className="section-title-accent">Questions</span></h2>
        </div>

        <div className="faq-list">
          {service.faq.map((item, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(i)}>
                <span>{item.question}</span>
                <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           FINAL CTA
           ============================================================ */}
      <section id="cta" className="cta-section">
        <div className="cta-content animate-on-scroll">
          <h2 className="cta-title">{service.cta.title}</h2>
          <p className="cta-desc">{service.cta.subtitle}</p>
          <button onClick={handleGetStarted} className="cta-btn">
            {service.cta.buttonText}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetails;