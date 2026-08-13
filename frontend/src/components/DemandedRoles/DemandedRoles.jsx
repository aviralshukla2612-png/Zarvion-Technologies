import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROLES } from './roles';
import './DemandedRoles.css';

gsap.registerPlugin(ScrollTrigger);

// filter: 'all' (Home – mixed IT + non-IT), 'it' (IT Roles page), 'non-it' (Non-IT Roles page)
const DemandedRoles = ({ filter = 'all' }) => {
  const navigate = useNavigate();

  const roles =
    filter === 'it' ? ROLES.filter((r) => r.type === 'it') :
      filter === 'non-it' ? ROLES.filter((r) => r.type === 'non-it') :
        ROLES;

  // DOM refs
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeIndex, setActiveIndex] = useState(0);

  const ctxRef = useRef(null);
  const activeIndexRef = useRef(0);
  const isMobileRef = useRef(isMobile);
  const quickSettersRef = useRef([]);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    let timer;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCardClick = useCallback((slug) => {
    navigate(`/roles/${slug}`);
  }, [navigate]);

  useLayoutEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }
    cardRefs.current = cardRefs.current.slice(0, roles.length);

    const track = trackRef.current;
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const cards = cardRefs.current;

    if (!track || !viewport || !stage || cards.length === 0) {
      return;
    }

    activeIndexRef.current = 0;
    setActiveIndex(0);

    if (isMobileRef.current) {
      track.style.height = 'auto';
      stage.style.transform = 'none';
      cards.forEach((card, i) => {
        card.style.opacity = '1';
        card.style.transform = 'none';
        card.classList.toggle('active', i === 0);
      });
      return;
    }

    const ctx = gsap.context(() => {
      const cardWidth = cards[0].offsetWidth || 400;
      const gap = 32;
      const step = cardWidth + gap;
      const totalCards = roles.length;
      const totalWidth = step * (totalCards - 1);

      cards.forEach((card, i) => {
        const isActive = i === 0;
        card.classList.toggle('active', isActive);
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: `+=${totalWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut"
          },
          onUpdate: () => {
            const progress = tl.progress();
            const rawIndex = progress * (totalCards - 1);
            const roundedIndex = Math.round(rawIndex);

            if (roundedIndex !== activeIndexRef.current) {
              cards[activeIndexRef.current]?.classList.remove('active');
              cards[roundedIndex]?.classList.add('active');
              activeIndexRef.current = roundedIndex;
              setActiveIndex(roundedIndex);
            }
          },
        },
      });

      tl.fromTo(
        stage,
        { x: 0 },
        {
          x: -totalWidth,
          ease: 'none',
          force3D: true,
        },
        0
      );

      // Removed JS hover effects to rely purely on active state

      ScrollTrigger.refresh();
    }, sectionRef);

    ctxRef.current = ctx;

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      quickSettersRef.current = [];
    };
  }, [isMobile, filter, roles.length]);

  const heading =
    filter === 'it' ? <>Most Demanded <span className="roles-highlight">IT Roles</span></> :
      filter === 'non-it' ? <>Most Demanded <span className="roles-highlight">Non-IT Roles</span></> :
        <>Most Demanded <span className="roles-highlight">Career Roles</span></>;

  const description =
    filter === 'it'
      ? "Explore today's fastest-growing technology careers and discover the skills, opportunities, and career paths that leading companies are actively hiring for."
      : filter === 'non-it'
        ? "Explore high-growth business, marketing, and operations careers and discover the skills, opportunities, and career paths that leading companies are actively hiring for."
        : "Explore today's fastest-growing careers across technology and business, and discover the skills, opportunities, and career paths that leading companies are actively hiring for.";

  return (
    <section className="roles-section" ref={sectionRef} id={filter === 'all' ? 'demanded' : `${filter}-roles`}>
      <header className="roles-intro">
        <span className="roles-badge">
          <span className="roles-badge-dot" aria-hidden="true"></span>
          HOT CAREER OPPORTUNITIES
        </span>
        <h2 className="roles-heading">{heading}</h2>
        <p className="roles-desc">{description}</p>
      </header>

      <div className="pin-track" ref={trackRef}>
        <div className="pin-viewport" ref={viewportRef}>
          <div className="card-stage" ref={stageRef}>
            {roles.map((role, index) => (
              <article
                key={role.slug}
                ref={(el) => (cardRefs.current[index] = el)}
                className="demanded-role-card"
                data-index={index}
              >
                <div
                  className="card-image"
                  onClick={() => handleCardClick(role.slug)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(role.slug);
                    }
                  }}
                  aria-label={`View ${role.title} details`}
                >
                  <img
                    src={role.img}
                    alt={role.title}
                    loading="eager"
                    decoding="sync"
                    onError={(e) => {
                      const fallback =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='100%25' height='100%25' fill='%230a0e1a'/%3E%3C/svg%3E";
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                  <div className="image-overlay" />
                  <div className="image-glow" />
                  <div className="image-hover-veil" />
                  <h3 className="image-title">{role.title}</h3>
                  <div className="explore-career-wrapper">
                    <span className="explore-career-btn">Explore Career &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemandedRoles;