import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROLES } from './roles';
import './DemandedRoles.css';

gsap.registerPlugin(ScrollTrigger);

const DemandedRoles = () => {
  const navigate = useNavigate();

  // DOM refs
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);

  // React state – only for initial render, not animation
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeIndex, setActiveIndex] = useState(0); // only used for display, not animation

  // Animation refs – no React state during scroll
  const ctxRef = useRef(null);
  const activeIndexRef = useRef(0);
  const isMobileRef = useRef(isMobile);
  const quickSettersRef = useRef([]); // store quickSetters for each card

  // Update mobile ref
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  // Resize handler with debounce
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

  // Main animation setup
  useLayoutEffect(() => {
    // Clean up previous animation
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    const track = trackRef.current;
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const cards = cardRefs.current;

    if (!track || !viewport || !stage || cards.length === 0) {
      return;
    }

    // Mobile: stack vertically, no animation
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

    // --- Desktop: create GSAP context ---
    const ctx = gsap.context(() => {
      // Measure once
      const cardWidth = cards[0].offsetWidth || 400;
      const gap = 32;
      const step = cardWidth + gap;
      const totalCards = ROLES.length;
      const totalWidth = step * (totalCards - 1);
      const viewportHeight = viewport.clientHeight || window.innerHeight;

      // Set track height for scroll distance
      track.style.height = `${viewportHeight + totalWidth}px`;

      // --- Create quickSetters for each card ---
      const setters = cards.map((card) => ({
        scale: gsap.quickSetter(card, 'scale', 'px'),
        opacity: gsap.quickSetter(card, 'opacity'),
        zIndex: gsap.quickSetter(card, 'zIndex'),
      }));
      quickSettersRef.current = setters;

      // --- Initial card states ---
      cards.forEach((card, i) => {
        const isActive = i === 0;
        gsap.set(card, {
          scale: isActive ? 1 : 0.8,
          opacity: isActive ? 1 : 0.25,
          zIndex: isActive ? 3 : 1,
          force3D: true,
        });
        card.classList.toggle('active', isActive);
      });

      // --- Master timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: `+=${totalWidth}`,
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const rawIndex = progress * (totalCards - 1);
            const roundedIndex = Math.round(rawIndex);

            // Update active class and React state only when changed
            if (roundedIndex !== activeIndexRef.current) {
              // Remove active class from old card
              cards[activeIndexRef.current]?.classList.remove('active');
              // Add active class to new card
              cards[roundedIndex]?.classList.add('active');
              activeIndexRef.current = roundedIndex;
              setActiveIndex(roundedIndex); // only if you display it elsewhere
            }

            // Update card properties using quickSetters – super fast
            const setters = quickSettersRef.current;
            for (let i = 0; i < cards.length; i++) {
              const distance = Math.abs(i - rawIndex);
              let scale, opacity, zIndex;
              if (distance <= 0.5) {
                scale = 1;
                opacity = 1;
                zIndex = 3;
              } else if (distance <= 1.5) {
                const t = (distance - 0.5) / 1.0;
                scale = 1 - 0.15 * Math.min(t, 1);
                opacity = 1 - 0.5 * Math.min(t, 1);
                zIndex = 2;
              } else {
                scale = 0.8;
                opacity = 0.25;
                zIndex = 1;
              }
              setters[i].scale(scale);
              setters[i].opacity(opacity);
              setters[i].zIndex(zIndex);
            }
          },
        },
      });

      // --- Horizontal slide ---
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

      // --- Hover effects (Apple-style) ---
      cards.forEach((card) => {
        const image = card.querySelector('.card-image');
        if (!image) return;

        let hoverAnim = null;

        const onEnter = () => {
          if (card.classList.contains('active')) {
            hoverAnim = gsap.to(card, {
              scale: 1.03,
              duration: 0.4,
              ease: 'power2.out',
              force3D: true,
              overwrite: 'auto',
            });
          }
        };

        const onLeave = () => {
          if (hoverAnim) {
            hoverAnim.kill();
            hoverAnim = null;
          }
          if (card.classList.contains('active')) {
            gsap.to(card, {
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
              force3D: true,
              overwrite: 'auto',
            });
          }
        };

        image.addEventListener('mouseenter', onEnter);
        image.addEventListener('mouseleave', onLeave);

        card._cleanupHover = () => {
          image.removeEventListener('mouseenter', onEnter);
          image.removeEventListener('mouseleave', onLeave);
          if (hoverAnim) {
            hoverAnim.kill();
            hoverAnim = null;
          }
        };
      });

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }, sectionRef);

    ctxRef.current = ctx;

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      // Cleanup hover listeners
      cards.forEach((card) => {
        if (card._cleanupHover) {
          card._cleanupHover();
          delete card._cleanupHover;
        }
      });
      quickSettersRef.current = [];
    };
  }, [isMobile]);

  return (
    <section className="roles-section" ref={sectionRef}>
      <header className="roles-intro">
        <span className="roles-badge">
          <span className="roles-badge-dot" aria-hidden="true"></span>
          HOT CAREER OPPORTUNITIES
        </span>
        <h2 className="roles-heading">Most Demanded IT Roles</h2>
        <p className="roles-desc">
          Explore today's fastest-growing technology careers and discover the skills,
          opportunities, and career paths that leading companies are actively hiring for.
        </p>
      </header>

      <div className="pin-track" ref={trackRef}>
        <div className="pin-viewport" ref={viewportRef}>
          <div className="card-stage" ref={stageRef}>
            {ROLES.map((role, index) => (
              <article
                key={role.slug}
                ref={(el) => (cardRefs.current[index] = el)}
                className="role-card"
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
                  />
                  <div className="image-overlay" />
                  <div className="image-glow" />
                  <div className="image-hover-veil" />
                  <h3 className="image-title">{role.title}</h3>
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