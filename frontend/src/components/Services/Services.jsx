import React, { useRef, useState, useLayoutEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeContext } from '../../context/ThemeContext';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

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
    <path d="M11 34c1.5-5 5.5-8 8-8s6.5 3 8 8" /><path d="M30 17h8M30 23h8M30 29h8" />
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

const SERVICES = [
  {
    id: '01', slug: 'resume-building', title: 'Resume Building',
    desc: 'Craft recruiter-ready resumes engineered to pass ATS filters and land interview calls at Fortune 500 companies.',
    features: ['ATS Friendly', 'HR Approved', 'Modern Templates', 'Keyword Optimisation'],
    accent: '#3B82F6',
    cardBgDark: 'linear-gradient(135deg, #060f28 0%, #0a1535 100%)',
    cardBgLight: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
    icon: IconResume,
  },
  {
    id: '02', slug: 'linkedin-optimization', title: 'LinkedIn Optimisation',
    desc: 'SEO-optimised professional branding with compelling About sections and strategic keyword density.',
    features: ['SEO Optimised', 'Professional Branding', 'Featured Section', 'Network Growth'],
    accent: '#A855F7',
    cardBgDark: 'linear-gradient(135deg, #0f0620 0%, #160a2e 100%)',
    cardBgLight: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%)',
    icon: IconLinkedIn,
  },
  {
    id: '03', slug: 'interview-preparation', title: 'Interview Preparation',
    desc: 'Live mock interviews with senior industry coaches, real-time feedback loops, STAR method mastery.',
    features: ['Mock Interviews', 'STAR Method', 'Real-time Feedback', 'Confidence Building'],
    accent: '#06B6D4',
    cardBgDark: 'linear-gradient(135deg, #021520 0%, #041e2c 100%)',
    cardBgLight: 'linear-gradient(135deg, #cffafe 0%, #ecfeff 100%)',
    icon: IconInterview,
  },
  {
    id: '04', slug: 'global-job-placement', title: 'Global Job Placement',
    desc: 'Access our curated global network of 500+ hiring partners across UK, Canada, Germany, and UAE.',
    features: ['Global Network', 'Top Employers', 'Cross-border Roles', 'Relocation Support'],
    accent: '#F59E0B',
    cardBgDark: 'linear-gradient(135deg, #1a0f02 0%, #221504 100%)',
    cardBgLight: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
    icon: IconGlobal,
  },
  {
    id: '05', slug: 'career-roadmap', title: 'Career Roadmap',
    desc: 'Personalised 90-day and 12-month career blueprints with skill gap analysis and milestone tracking.',
    features: ['Personalised Plan', 'Skill Mapping', 'Milestone Tracking', 'Growth Monitoring'],
    accent: '#10B981',
    cardBgDark: 'linear-gradient(135deg, #021510 0%, #041e16 100%)',
    cardBgLight: 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)',
    icon: IconRoadmap,
  },
  {
    id: '06', slug: 'visa-documentation', title: 'Visa & Documentation',
    desc: 'End-to-end support for work permits, skilled worker visas, document authentication, and legal compliance.',
    features: ['Work Permits', 'Visa Guidance', 'Document Prep', 'Legal Support'],
    accent: '#F43F5E',
    cardBgDark: 'linear-gradient(135deg, #1a0208 0%, #22040e 100%)',
    cardBgLight: 'linear-gradient(135deg, #ffe4e6 0%, #fff1f2 100%)',
    icon: IconVisa,
  },
];

const STRIP = 64; // px — collapsed heading height (desktop)

const Services = ({ variant = 'home' }) => {
  const { isDark } = useContext(ThemeContext);
  // `hovered` is the ONLY thing that drives the expanded state.
  // Cards always render collapsed by default; hovering (desktop) or
  // tapping (touch, via handleCardClick) is what reveals the body.
  // On touch devices, CSS :hover is gated off entirely (see CSS file)
  // so this single state value is the only source of truth — that's
  // what guarantees exactly one card can ever be expanded at a time.
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
  const pinRef     = useRef(null);   // element that gets pinned
  const cardRefs   = useRef([]);
  const ctxRef     = useRef(null);
  const navigate   = useNavigate();

  const handleLearnMore = (slug, e) => {
    e.preventDefault(); e.stopPropagation();
    navigate(`/services/${slug}`);
  };

  const handleCardClick = (i) => {
    // Touch devices have no hover — tapping pins that card open.
    setHovered(prev => (prev === i ? null : i));
  };

  useLayoutEffect(() => {
    if (ctxRef.current) { ctxRef.current.revert(); ctxRef.current = null; }

    const pin   = pinRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!pin || !cards.length) return;

    const isMobile = window.innerWidth <= 768;
    // Smaller strip / scroll segment on mobile so the pinned section
    // doesn't take up an excessive amount of scroll distance.
    // segment bumped slightly (120 -> 150) to give a bit more scroll
    // room per card now that the mobile expanded layout is denser.
    const strip   = isMobile ? 46 : STRIP;
    const segment = isMobile ? 150 : 180;
    const total   = SERVICES.length;

    const ctx = gsap.context(() => {
      const cardH  = cards[0].offsetHeight;
      const stackH = (total - 1) * strip + cardH;

      pin.style.height = `${stackH}px`;

      cards.forEach((card, i) => {
        gsap.set(card, {
          position: 'absolute',
          top: `${i * strip}px`,
          left: 0,
          width: '100%',
          y: 80,
          opacity: 0,
          zIndex: i + 1,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${total * segment}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const pos = i / total;
        tl.to(card, {
          y: 0,
          opacity: 1,
          duration: 1 / total,
          ease: 'power2.out',
        }, pos);
      });

    }, sectionRef);

    ctxRef.current = ctx;
    return () => { ctxRef.current?.revert(); ctxRef.current = null; };
  }, [isDark]);

  return (
    <section className={`srv-section srv-section--${variant}`} id="services" ref={sectionRef}>
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

        <div className="srv-pin" ref={pinRef}>
          {SERVICES.map((service, i) => {
            const cardBg = isDark ? service.cardBgDark : service.cardBgLight;
            return (
              <div
                key={service.id}
                className={`srv-card${hovered === i ? ' is-hovered' : ''}`}
                style={{ '--accent': service.accent, zIndex: i + 1 }}
                ref={el => { cardRefs.current[i] = el; }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleCardClick(i)}
              >
                <div className="srv-card-inner" style={{ background: cardBg }}>
                  <span className="srv-card-bgnum" aria-hidden="true">{service.id}</span>

                  {/* Always-visible icon in collapsed state — positioned right side of card */}
                  <div className="srv-card-preview-icon" aria-hidden="true">
                    <span className="srv-card-halo" />
                    <span className="srv-card-icon">{service.icon}</span>
                  </div>

                  <div className="srv-card-head">
                    <span className="srv-card-index">[ {service.id} ]</span>
                    <h3 className="srv-card-title">{service.title}</h3>
                    <span className="srv-card-icon-sm">{service.icon}</span>
                    <span className="srv-card-arrow" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>

                  <div className="srv-card-body">
                    <div className="srv-card-body-inner">
                      <div className="srv-card-text">
                        <p className="srv-card-desc">{service.desc}</p>
                        <ul className="srv-card-features">
                          {service.features.map((f, fi) => (
                            <li className="srv-card-feature" key={fi}>
                              <span className="srv-card-feature-icon">{CheckIcon}</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <a href={`/services/${service.slug}`} className="srv-card-cta"
                          onClick={e => handleLearnMore(service.slug, e)}>
                          <span>Learn More</span>{ArrowIcon}
                        </a>
                      </div>
                      <div className="srv-card-icon-wrap">
                        <span className="srv-card-halo" />
                        <span className="srv-card-icon">{service.icon}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;