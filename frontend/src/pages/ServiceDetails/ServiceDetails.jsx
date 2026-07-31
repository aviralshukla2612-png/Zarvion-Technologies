// ============================================================
// ServiceDetails.jsx — Zarvion Technologies
// Dynamic service details page
// ============================================================

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getServiceBySlug } from '../../data/services';
import './ServiceDetails.css';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleTestimonialsMouseMove = (e) => {
    const cards = e.currentTarget.querySelectorAll('.testimonials-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Calculate mouse parallax center offset
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });
  };

  // Scroll animations using Intersection Observer for generic page elements
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
  }, [slug]);

  // GSAP Smooth Scroll Animation
  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.process-item');
      items.forEach((item, i) => {
        const isOdd = i % 2 === 0;
        // On mobile, they all come from the left
        const isMobile = window.innerWidth <= 600;
        const xOffset = isMobile ? -50 : (isOdd ? -150 : 150);

        gsap.fromTo(item, 
          { x: xOffset, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'center 50%',
              scrub: 1, // Smooth scrub effect
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [service]);

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

  // Removed handleGetStarted

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
              {/* Get Started button removed */}
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
            <div key={i} className="process-item">
              <div className="process-item-dot"></div>
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
           TESTIMONIALS
           ============================================================ */}
      <section className="testimonials-section" onMouseMove={handleTestimonialsMouseMove}>
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
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
            <Link to="/contact" className="cta-btn">
              Contact Us
            </Link>
            <a 
              href="tel:+917890012345" 
              className="cta-btn" 
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                boxShadow: 'none'
              }}
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetails;