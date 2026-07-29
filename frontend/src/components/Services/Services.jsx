// ============================================================
// Services.jsx — Zarvion Technologies
// Premium Services — sticky stacking scroll effect
// ============================================================

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

// ============================================================
// ICONS — one per service, simple line-art matching the theme
// ============================================================
const IconResume = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 6h14l8 8v26a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
    <path d="M28 6v8h8" />
    <path d="M17 24h14M17 30h14M17 36h9" />
  </svg>
);

const IconLinkedIn = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="4" />
    <circle cx="12" cy="14" r="3.2" />
    <circle cx="36" cy="14" r="3.2" />
    <circle cx="12" cy="34" r="3.2" />
    <circle cx="36" cy="34" r="3.2" />
    <path d="M15 15.8 21 21M33 15.8 27 21M15 32.2 21 27M33 32.2 27 27" />
  </svg>
);

const IconInterview = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="18" y="6" width="12" height="20" rx="6" />
    <path d="M12 21v2a12 12 0 0 0 24 0v-2" />
    <path d="M24 35v7M18 42h12" />
  </svg>
);

const IconGlobal = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18" />
    <path d="M6 24h36M24 6c5 5 8 11.5 8 18s-3 13-8 18c-5-5-8-11.5-8-18s3-13 8-18Z" />
  </svg>
);

const IconRoadmap = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 38 18 10l6 12 6-9 12 25" />
    <circle cx="18" cy="10" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="24" cy="22" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="30" cy="13" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="42" cy="38" r="2.4" fill="currentColor" stroke="none" />
  </svg>
);

const IconVisa = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="8" width="32" height="32" rx="4" />
    <circle cx="19" cy="20" r="5" />
    <path d="M11 34c1.5-5 5.5-8 8-8s6.5 3 8 8" />
    <path d="M30 17h8M30 23h8M30 29h8" />
  </svg>
);

// Small check icon used in the feature list
const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// ============================================================
// SERVICE DATA with slugs for routing
// ============================================================
const SERVICES = [
  {
    id: '01',
    slug: 'resume-building',
    title: 'Resume Building',
    desc: 'Craft recruiter-ready resumes engineered to pass ATS filters and land interview calls at Fortune 500 companies.',
    features: ['ATS Friendly', 'HR Approved', 'Modern Templates', 'Keyword Optimisation'],
    accent: '#3B82F6',
    accentDim: '#1D4ED8',
    icon: IconResume,
  },
  {
    id: '02',
    slug: 'linkedin-optimization',
    title: 'LinkedIn Optimisation',
    desc: 'SEO-optimised professional branding with compelling About sections and strategic keyword density.',
    features: ['SEO Optimised', 'Professional Branding', 'Featured Section', 'Network Growth'],
    accent: '#60A5FA',
    accentDim: '#2563EB',
    icon: IconLinkedIn,
  },
  {
    id: '03',
    slug: 'interview-preparation',
    title: 'Interview Preparation',
    desc: 'Live mock interviews with senior industry coaches, real-time feedback loops, STAR method mastery.',
    features: ['Mock Interviews', 'STAR Method', 'Real-time Feedback', 'Confidence Building'],
    accent: '#38BDF8',
    accentDim: '#0369A1',
    icon: IconInterview,
  },
  {
    id: '04',
    slug: 'global-job-placement',
    title: 'Global Job Placement',
    desc: 'Access our curated global network of 500+ hiring partners across UK, Canada, Germany, and UAE.',
    features: ['Global Network', 'Top Employers', 'Cross-border Roles', 'Relocation Support'],
    accent: '#818CF8',
    accentDim: '#4338CA',
    icon: IconGlobal,
  },
  {
    id: '05',
    slug: 'career-roadmap',
    title: 'Career Roadmap',
    desc: 'Personalised 90-day and 12-month career blueprints with skill gap analysis and milestone tracking.',
    features: ['Personalised Plan', 'Skill Mapping', 'Milestone Tracking', 'Growth Monitoring'],
    accent: '#34D399',
    accentDim: '#059669',
    icon: IconRoadmap,
  },
  {
    id: '06',
    slug: 'visa-documentation',
    title: 'Visa & Documentation',
    desc: 'End-to-end support for work permits, skilled worker visas, document authentication, and legal compliance.',
    features: ['Work Permits', 'Visa Guidance', 'Document Prep', 'Legal Support'],
    accent: '#F472B6',
    accentDim: '#BE185D',
    icon: IconVisa,
  },
];

const Services = ({ variant = 'home' }) => {
  const rollRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // ── Navigate to service detail page ──
  const handleLearnMore = (slug, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/services/${slug}`);
  };

  // ── SCROLL LOGIC ──
  const computeActive = useCallback(() => {
    let active = 0;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stickyTop = parseFloat(window.getComputedStyle(el).top) || 0;
      if (rect.top <= stickyTop + 1) active = i;
    });
    setActiveIndex(active);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    };

    computeActive();
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(computeActive);
    });
    const t1 = setTimeout(computeActive, 150);
    const t2 = setTimeout(computeActive, 500);
    window.addEventListener('load', computeActive);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('load', computeActive);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [computeActive]);

  return (
    <section className={`srv-section srv-section--${variant}`} id="services">
      {/* Ambient background */}
      <div className="srv-grid-bg" />
      <div className="srv-blob srv-blob--a" />
      <div className="srv-blob srv-blob--b" />

      <div className="srv-container">
        {/* Header */}
        <div className="srv-header">
          <span className="srv-eyebrow">
            <span className="srv-eyebrow-dot" />
            OUR EXPERTISE
          </span>
          <h2 className="srv-title">
            Premium <span className="srv-title--accent">Services</span>
          </h2>
          <p className="srv-desc">
            Explore our career acceleration services — each designed to give you an unfair advantage.
          </p>
        </div>

        {/* Mini sticky header */}
        <div className="srv-mini-header">
          <span className="srv-mini-header-dot" />
          <span className="srv-mini-header-label">Premium Services</span>
          <span className="srv-mini-header-count">
            {String(activeIndex + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
          </span>
        </div>

        <div className="srv-roll-wrap">
          {/* Sticky stacking roll */}
          <div className="srv-roll" ref={rollRef}>
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className={`srv-roll-item ${i === activeIndex ? 'is-active' : ''} ${i < activeIndex ? 'is-passed' : ''}`}
                style={{
                  '--i': i,
                  '--accent': service.accent,
                  '--accent-dim': service.accentDim,
                  top: `calc(var(--roll-base) + var(--roll-step) * ${i})`,
                  zIndex: 10 + i,
                }}
                ref={(el) => { itemRefs.current[i] = el; }}
              >
                <div className="srv-roll-inner">
                  {/* Background number watermark */}
                  <span className="srv-roll-bgnum" aria-hidden="true">{service.id}</span>

                  <div className="srv-roll-body">
                    {/* Left column: index, title, desc, features, CTA */}
                    <div className="srv-roll-text">
                      <div className="srv-roll-headrow">
                        <span className="srv-roll-index">[ {service.id} ]</span>
                        <h3 className="srv-roll-title">{service.title}</h3>
                      </div>

                      <p className="srv-roll-desc">{service.desc}</p>

                      <ul className="srv-roll-features">
                        {service.features.map((f, idx) => (
                          <li className="srv-roll-feature" key={idx}>
                            <span className="srv-roll-feature-icon">{CheckIcon}</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Learn More button with navigation */}
                      <a
                        href={`/services/${service.slug}`}
                        className="srv-roll-cta"
                        onClick={(e) => handleLearnMore(service.slug, e)}
                      >
                        <span>Learn More</span>
                        {ArrowIcon}
                      </a>
                    </div>

                    {/* Right column: icon illustration + orbit rings + particles + halo */}
                    <div className="srv-roll-icon-wrap">
                      <span className="srv-roll-halo" />
                      <span className="srv-roll-orbit srv-roll-orbit--1" />
                      <span className="srv-roll-orbit srv-roll-orbit--2" />
                      <span className="srv-roll-particle srv-roll-particle--1" />
                      <span className="srv-roll-particle srv-roll-particle--2" />
                      <span className="srv-roll-particle srv-roll-particle--3" />
                      <span className="srv-roll-icon">{service.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End-of-stack marker */}
            <div className="srv-roll-end">
              <span className="srv-roll-end-line" />
              <span className="srv-roll-end-label">That's the full lineup</span>
              <span className="srv-roll-end-line" />
            </div>
          </div>

          {/* Progress rail — purely decorative, tracks activeIndex */}
          <div className="srv-rail" aria-hidden="true">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className={`srv-rail-dot ${i === activeIndex ? 'is-active' : ''} ${i < activeIndex ? 'is-passed' : ''}`}
                style={{ '--accent': service.accent }}
              >
                <span className="srv-rail-num">{service.id}</span>
                <span className="srv-rail-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;