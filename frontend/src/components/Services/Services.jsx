import React, { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const IconResume = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 6h14l8 8v26a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
    <path d="M28 6v8h8" /><path d="M17 24h14M17 30h14M17 36h9" />
  </svg>
);
const IconLinkedIn = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="4" /><circle cx="12" cy="14" r="3.2" /><circle cx="36" cy="14" r="3.2" />
    <circle cx="12" cy="34" r="3.2" /><circle cx="36" cy="34" r="3.2" />
    <path d="M15 15.8 21 21M33 15.8 27 21M15 32.2 21 27M33 32.2 27 27" />
  </svg>
);
const IconInterview = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="18" y="6" width="12" height="20" rx="6" />
    <path d="M12 21v2a12 12 0 0 0 24 0v-2" /><path d="M24 35v7M18 42h12" />
  </svg>
);
const IconGlobal = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18" />
    <path d="M6 24h36M24 6c5 5 8 11.5 8 18s-3 13-8 18c-5-5-8-11.5-8-18s3-13 8-18Z" />
  </svg>
);
const IconImmigration = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="8" width="32" height="32" rx="4" />
    <circle cx="19" cy="20" r="5" />
    <path d="M11 34c1.5-5 5.5-8 8-8s6.5 3 8 8" /><path d="M30 17h8M30 23h8M30 29h8" />
  </svg>
);
const IconTechTraining = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="10" width="36" height="24" rx="3" />
    <path d="M4 40h40" />
    <path d="M18 18l-6 6 6 6M30 18l6 6-6 6" />
  </svg>
);
const IconPostPlacement = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 28v-4a14 14 0 0 1 28 0v4" />
    <rect x="4" y="26" width="9" height="12" rx="3" />
    <rect x="35" y="26" width="9" height="12" rx="3" />
    <path d="M35 38a6 6 0 0 1-6 6h-5" />
  </svg>
);
const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);
const ArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ChevronIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const SERVICES = [
  {
    id: '01', slug: 'resume-building', title: 'Resume Building & In-Depth Understanding',
    desc: 'Craft recruiter-ready resumes engineered to pass ATS filters and land interview calls at Fortune 500 companies.',
    features: ['ATS Friendly', 'HR Approved', 'Modern Templates', 'Keyword Optimisation', 'In-Depth Understanding'],
    accent: '#3B82F6',
    icon: IconResume,
  },
  {
    id: '02', slug: 'linkedin-optimization', title: 'LinkedIn Optimisation & Application Boost',
    desc: 'SEO-optimised professional branding with compelling About sections and strategic keyword density.',
    features: ['SEO Optimised', 'Professional Branding', 'Featured Section', 'Network Growth', 'Application Boost'],
    accent: '#A855F7',
    icon: IconLinkedIn,
  },
  {
    id: '03', slug: 'interview-preparation', title: 'Interview Preparation',
    desc: 'Live mock interviews with senior industry coaches, real-time feedback loops, STAR method mastery.',
    features: ['Mock Interviews', 'STAR Method', 'Real-time Feedback', 'Confidence Building'],
    accent: '#06B6D4',
    icon: IconInterview,
  },
  {
    id: '04', slug: 'global-job-placement', title: 'Global Job Placement',
    desc: 'Access our curated global network of 500+ hiring partners across UK, Canada, Germany, and UAE.',
    features: ['Global Network', 'Top Employers', 'Cross-border Roles', 'Relocation Support'],
    accent: '#F59E0B',
    icon: IconGlobal,
  },
  {
    id: '05', slug: 'immigration-advisory', title: 'Immigration Advisory',
    desc: 'Expert guidance for work permits, skilled-worker visas, document authentication, and cross-border legal compliance.',
    features: ['Work Permits', 'Visa Guidance', 'Document Prep', 'Legal Support'],
    accent: '#F43F5E',
    icon: IconImmigration,
  },
  {
    id: '06', slug: 'technical-training', title: 'Technical Training',
    desc: 'Hands-on upskilling in the tools, frameworks, and technical interviews your target role actually demands.',
    features: ['Hands-on Labs', 'Industry Tools', 'Mock Assessments', 'Mentor-Led Sessions'],
    accent: '#8B5CF6',
    icon: IconTechTraining,
  },
  {
    id: '07', slug: 'post-placement-support', title: 'Post Placement Support',
    desc: 'Continued support after you join — onboarding guidance, 90-day check-ins, and coaching to help you settle in and thrive.',
    features: ['90-Day Check-ins', 'Onboarding Guidance', 'Performance Coaching', 'Ongoing Mentorship'],
    accent: '#14B8A6',
    icon: IconPostPlacement,
  },
];

const ServicePanelContent = ({ service, onLearnMore }) => (
  <div className="srv-panel-inner" style={{ '--accent': service.accent }}>
    <div className="srv-panel-top">
      <span className="srv-panel-index">[ {service.id} ]</span>
      <div className="srv-panel-icon-wrap">
        <span className="srv-panel-halo" aria-hidden="true" />
        <span className="srv-panel-icon">{service.icon}</span>
      </div>
    </div>
    <h3 className="srv-panel-title">{service.title}</h3>
    <p className="srv-panel-desc">{service.desc}</p>
    <ul className="srv-panel-features">
      {service.features.map((f, fi) => (
        <li className="srv-panel-feature" key={fi}>
          <span className="srv-panel-feature-icon">{CheckIcon}</span>
          <span>{f}</span>
        </li>
      ))}
    </ul>
    
     <a  href={`/services/${service.slug}`}
      className="srv-panel-cta"
      onClick={(e) => onLearnMore(service.slug, e)}
    >
      <span>Learn More</span>{ArrowIcon}
    </a>
  </div>
);

const Services = ({ variant = 'home' }) => {
  const [active, setActive] = useState(0);
  const rowRefs = useRef([]);
  const mobilePanelRef = useRef(null);
  const navigate = useNavigate();

  const handleLearnMore = (slug, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/services/${slug}`);
  };

  const handleRowClick = (i) => {
    setActive(i);
    if (window.innerWidth <= 900 && mobilePanelRef.current) {
      requestAnimationFrame(() => {
        mobilePanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  // Scroll-driven activation — as the list scrolls through the
  // viewport, whichever row crosses the vertical center becomes the
  // active service, so the highlight animates and the right-hand
  // panel updates as you scroll, not only on hover/tap.
  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!rows.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = rows.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );

    rows.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`srv-section srv-section--${variant}`} id="services">
      <div className="srv-grid-bg" />
      <div className="srv-blob srv-blob--a" />
      <div className="srv-blob srv-blob--b" />

      <div className="srv-container">
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

        <div className="srv-layout">
          {/* LEFT — plain list; active row highlight animates on scroll/hover */}
          <div className="srv-stack">
            {SERVICES.map((service, i) => (
              <button
                type="button"
                key={service.id}
                className={`srv-stack-card${active === i ? ' is-active' : ''}`}
                style={{ '--accent': service.accent, '--index': i }}
                ref={(el) => { rowRefs.current[i] = el; }}
                onMouseEnter={() => setActive(i)}
                onClick={() => handleRowClick(i)}
              >
                <span className="srv-stack-index">[ {service.id} ]</span>
                <span className="srv-stack-icon">{service.icon}</span>
                <span className="srv-stack-title">{service.title}</span>
                <span className="srv-stack-chevron" aria-hidden="true">{ChevronIcon}</span>
              </button>
            ))}
          </div>

          {/* RIGHT — sticky panel, flows in from the right on change */}
          <div className="srv-panel-desktop">
            <ServicePanelContent
              key={active}
              service={SERVICES[active]}
              onLearnMore={handleLearnMore}
            />
          </div>
        </div>

        {/* Mobile — panel appears below the tapped card */}
        <div className="srv-panel-mobile" ref={mobilePanelRef}>
          <ServicePanelContent
            key={`m-${active}`}
            service={SERVICES[active]}
            onLearnMore={handleLearnMore}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;