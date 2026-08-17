import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const IconResume = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 6h14l8 8v26a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
    <path d="M28 6v8h8" /><path d="M17 24h14M17 30h14M17 36h9" />
  </svg>
);
const IconBranding = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="14" />
    <path d="M18 24l4 4 8-8" />
  </svg>
);
const IconRoadmap = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l15-6 15 6v24l-15 6-15-6V12z" />
    <path d="M24 6v36M9 12l15 6 15-6" />
  </svg>
);
const IconInterview = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="18" y="6" width="12" height="20" rx="6" />
    <path d="M12 21v2a12 12 0 0 0 24 0v-2" /><path d="M24 35v7M18 42h12" />
  </svg>
);
const IconTechTraining = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="10" width="36" height="24" rx="3" />
    <path d="M4 40h40" />
    <path d="M18 18l-6 6 6 6M30 18l6 6-6 6" />
  </svg>
);
const IconPlacement = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18" />
    <path d="M6 24h36M24 6c5 5 8 11.5 8 18s-3 13-8 18c-5-5-8-11.5-8-18s3-13 8-18Z" />
  </svg>
);
const IconOnboarding = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 10L10 24l14 14" />
    <path d="M10 24h28" />
  </svg>
);
const IconImmigration = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="8" width="32" height="32" rx="4" />
    <circle cx="19" cy="20" r="5" />
    <path d="M11 34c1.5-5 5.5-8 8-8s6.5 3 8 8" /><path d="M30 17h8M30 23h8M30 29h8" />
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
    id: '01', slug: 'resume-enhancement', title: 'Resume Enhancement',
    desc: 'Craft recruiter-ready resumes engineered to pass ATS filters and land interview calls at Fortune 500 companies.',
    features: ['ATS Friendly', 'HR Approved', 'Modern Templates', 'Keyword Optimisation', 'In-Depth Understanding'],
    accent: '#3B82F6',
    icon: IconResume,
  },
  {
    id: '02', slug: 'professional-branding', title: 'Professional Branding',
    desc: 'SEO-optimised professional branding with compelling About sections and strategic keyword density.',
    features: ['SEO Optimised', 'Profile Audits', 'Portfolio Showcase', 'Network Growth', 'Brand Identity'],
    accent: '#22D3EE',
    icon: IconBranding,
  },
  {
    id: '03', slug: 'career-roadmap', title: 'Career Roadmap',
    desc: 'Get a clear, actionable career progression plan with step-by-step milestones to reach your ultimate professional goals.',
    features: ['Goal Setting', 'Skill Gap Analysis', 'Actionable Steps', 'Long-term Strategy', 'Milestone Tracking'],
    accent: '#10B981',
    icon: IconRoadmap,
  },
  {
    id: '04', slug: 'interview-preparation', title: 'Interview Preparation',
    desc: 'Live mock interviews with senior industry coaches, real-time feedback loops, STAR method mastery.',
    features: ['Mock Interviews', 'STAR Method', 'Real-time Feedback', 'Confidence Building'],
    accent: '#F59E0B',
    icon: IconInterview,
  },
  {
    id: '05', slug: 'technical-training', title: 'Technical Training',
    desc: 'Hands-on upskilling in the tools, frameworks, and technical interviews your target role actually demands.',
    features: ['Hands-on Labs', 'Industry Tools', 'Mock Assessments', 'Mentor-Led Sessions'],
    accent: '#8B5CF6',
    icon: IconTechTraining,
  },
  {
    id: '06', slug: 'seamless-onboarding', title: 'Seamless Onboarding',
    desc: 'Expert guidance on navigating corporate culture, building early relationships, and making an immediate impact.',
    features: ['First 30 Days', 'Culture Navigation', 'Relationship Building', 'Expectation Setting'],
    accent: '#F43F5E',
    icon: IconOnboarding,
  },
  {
    id: '07', slug: 'immigration-advisory', title: 'Immigration Advisory',
    desc: 'Expert guidance for work permits, skilled-worker visas, document authentication, and cross-border legal compliance.',
    features: ['Work Permits', 'Visa Guidance', 'Document Prep', 'Legal Support'],
    accent: '#F97316',
    icon: IconImmigration,
  },
  {
    id: '08', slug: 'post-placement-support', title: 'Post Placement Support',
    desc: 'Continued support after you join — 90-day check-ins and coaching to help you settle in and thrive.',
    features: ['90-Day Check-ins', 'Performance Coaching', 'Ongoing Mentorship', 'Retention Support'],
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
  const sectionRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLearnMore = (slug, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/services/${slug}`);
  };

  const handleRowClick = (i) => {
    setActive(i);
    if (window.innerWidth <= 1024 && mobilePanelRef.current) {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      requestAnimationFrame(() => {
        mobilePanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      });
    } else if (isDesktop && sectionRef.current) {
      // Calculate where to scroll to make this card active
      const { top } = sectionRef.current.getBoundingClientRect();
      const scrollPos = window.scrollY + top;
      const scrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const targetScroll = scrollPos + ((i + 0.1) / SERVICES.length) * scrollableHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isDesktop) {
      const rows = rowRefs.current.filter(Boolean);
      if (!rows.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (isScrollingRef.current) return;
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
    } else {
      const proxy = { progress: 0 };
      
      const ctx = gsap.context(() => {
        gsap.to(proxy, {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8, // 0.8 seconds of smoothing
            onUpdate: () => {
              let newActive = Math.floor(proxy.progress * SERVICES.length);
              if (newActive >= SERVICES.length) newActive = SERVICES.length - 1;
              if (newActive < 0) newActive = 0;
              
              setActive((currentActive) => {
                if (currentActive !== newActive) return newActive;
                return currentActive;
              });
            }
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [isDesktop]);

  // Ensure active card is visible in the left stack smoothly without native stutter
  useEffect(() => {
    if (isDesktop && rowRefs.current[active]) {
      const activeCard = rowRefs.current[active];
      const stack = activeCard.parentElement;
      
      // Calculate target scroll position to center the active card in the stack
      const targetScroll = activeCard.offsetTop - (stack.clientHeight / 2) + (activeCard.clientHeight / 2);
      
      gsap.to(stack, {
        scrollTop: targetScroll,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  }, [active, isDesktop]);

  return (
    <section 
      className={`srv-section srv-section--${variant} ${isDesktop ? 'is-pinned' : ''}`} 
      id="services"
      ref={sectionRef}
    >
      <div className={isDesktop ? 'srv-sticky-wrapper' : ''}>
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
                  onClick={() => handleRowClick(i)}
                >
                  <span className="srv-stack-index">[ {service.id} ]</span>
                  <span className="srv-stack-icon">{service.icon}</span>
                  <span className="srv-stack-title">{service.title}</span>
                  <span className="srv-stack-chevron" aria-hidden="true">{ChevronIcon}</span>
                </button>
              ))}
              {isDesktop && <div style={{ minHeight: '40vh', flexShrink: 0 }} aria-hidden="true" />}
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