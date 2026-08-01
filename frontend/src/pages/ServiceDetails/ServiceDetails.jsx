// ============================================================
// ServiceDetails.jsx — Zarvion Technologies
// Dynamic service details page
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getServiceBySlug } from '../../data/services';
import * as FaIcons from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import BenefitsParticles from './BenefitsParticles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './ServiceDetails.css';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  
  const orbitSectionRef = useRef(null);
  const orbitContainerRef = useRef(null);
  const orbitItemsRef = useRef([]);

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

  // GSAP Smooth Scroll Animation & Orbit
  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Process Timeline Smooth Scroll
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

      // 2. Orbit Animation
      if (orbitContainerRef.current && orbitItemsRef.current.length > 0) {
        const oItems = orbitItemsRef.current.filter(Boolean);
        const isMobile = window.innerWidth <= 768;
        // On smaller screens we might use a slightly smaller radius if we weren't scaling it, but we are using CSS transform: scale().
        const radius = 210; 
        
        // Position items in a circle
        oItems.forEach((item, i) => {
          const angle = (i / oItems.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          gsap.set(item, { x, y });
        });

        // Rotate container
        const orbitTween = gsap.to(orbitContainerRef.current, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: "none"
        });

        // Counter-rotate items to keep them upright
        const counterTween = gsap.to(oItems, {
          rotation: -360,
          duration: 40,
          repeat: -1,
          ease: "none"
        });

        // Slow down orbit on scroll
        let scrollTimeout;
        ScrollTrigger.create({
          trigger: orbitSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const targetScale = Math.max(0.15, 1 - velocity / 1500);
            
            gsap.to([orbitTween, counterTween], {
              timeScale: targetScale,
              duration: 0.2,
              overwrite: "auto"
            });
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              gsap.to([orbitTween, counterTween], {
                timeScale: 1,
                duration: 0.8,
                overwrite: "auto"
              });
            }, 100);
          }
        });

        // Pause on hover
        const pauseOrbit = () => {
          gsap.to([orbitTween, counterTween], { timeScale: 0, duration: 0.5, overwrite: "auto" });
        };
        const resumeOrbit = () => {
          gsap.to([orbitTween, counterTween], { timeScale: 1, duration: 0.5, overwrite: "auto" });
        };

        oItems.forEach(item => {
          item.addEventListener('mouseenter', pauseOrbit);
          item.addEventListener('mouseleave', resumeOrbit);
        });

        // Store cleanup directly on elements if needed, but ctx.revert() handles GSAP. 
        // We do need to remove event listeners though.
        orbitContainerRef.current._cleanup = () => {
          oItems.forEach(item => {
            item.removeEventListener('mouseenter', pauseOrbit);
            item.removeEventListener('mouseleave', resumeOrbit);
          });
        };
      }
    });

    return () => {
      if (orbitContainerRef.current && orbitContainerRef.current._cleanup) {
        orbitContainerRef.current._cleanup();
      }
      ctx.revert();
    };
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
      <section className="benefits-section" style={{ position: 'relative' }}>
        <BenefitsParticles hoveredCardIndex={hoveredCardIndex} accentColor={service.accent} />
        <div className="section-header">
          <span className="section-badge">BENEFITS</span>
          <h2 className="section-title">Why Choose <span className="section-title-accent">Zarvion</span></h2>
        </div>
        
        <div className="benefits-grid">
          {service.benefits.map((benefit, i) => (
            <div 
              key={i} 
              className="benefits-card animate-on-scroll" 
              style={{ transitionDelay: `${i * 0.08}s` }}
              onMouseEnter={() => setHoveredCardIndex(i)}
              onMouseLeave={() => setHoveredCardIndex(null)}
            >
              <div className="benefits-card-icon particle-target">✦</div>
              <p className="benefits-card-text">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           FEATURES SECTION
           ============================================================ */}
      <section className="features-section" ref={orbitSectionRef}>
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2 className="section-title">What's <span className="section-title-accent">Included</span></h2>
        </div>

        <div className={`features-layout-container ${selectedFeature ? 'has-selection' : ''}`}>
          <div className="features-orbit-wrapper">
            <div className="orbit-center-sphere">
              {service.heroImage}
            </div>
            
            <div className="features-orbit-container" ref={orbitContainerRef}>
              {service.features.map((feature, i) => {
                const Icon = FaIcons[feature.iconType] || FaIcons.FaCheckCircle;
                return (
                  <div 
                    key={i} 
                    className="features-orbit-item"
                    ref={el => orbitItemsRef.current[i] = el}
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <div className="features-card" style={{ '--card-accent': feature.color }}>
                      <div className="features-card-icon">
                        <Icon />
                      </div>
                      <p className="features-card-text">{feature.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`feature-details-panel ${selectedFeature ? 'visible' : ''}`}>
            {selectedFeature && (
              <div 
                className="feature-drawer" 
                style={{ borderTopColor: selectedFeature.color }}
              >
                <button className="feature-drawer-close" onClick={() => setSelectedFeature(null)}>
                  <FiX />
                </button>
                <div className="feature-drawer-icon" style={{ color: selectedFeature.color }}>
                  {React.createElement(FaIcons[selectedFeature.iconType] || FaIcons.FaCheckCircle)}
                </div>
                <h3 className="feature-drawer-title">{selectedFeature.title}</h3>
                <p className="feature-drawer-desc">{selectedFeature.details}</p>
              </div>
            )}
          </div>
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
      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">Real <span className="section-title-accent">Results</span></h2>
        </div>

        <Swiper
          modules={[Parallax, Pagination, Autoplay]}
          parallax={true}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="testimonials-swiper"
        >
          {service.testimonials.map((testimonial, i) => (
            <SwiperSlide key={i} className="testimonials-slide">
              <div className="testimonials-card parallax-bg">
                <div 
                  className="testimonials-quote"
                  data-swiper-parallax="-200"
                >
                  ❝
                </div>
                <p 
                  className="testimonials-text"
                  data-swiper-parallax="-100"
                >
                  {testimonial.quote}
                </p>
                <div 
                  className="testimonials-author"
                  data-swiper-parallax="-150"
                >
                  <img src={testimonial.image} alt={testimonial.name} className="testimonials-author-image" />
                  <div>
                    <div className="testimonials-author-name">{testimonial.name}</div>
                    <div className="testimonials-author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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