import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    text: "This resume got me interviews at 5 FAANG companies in one week.",
    image: "https://i.pravatar.cc/150?img=32",
    color: "linear-gradient(135deg, rgba(47,128,255,0.55), rgba(90,168,255,0.35))"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager at Microsoft",
    text: "The ATS optimisation made all the difference. I finally got callbacks.",
    image: "https://i.pravatar.cc/150?img=51",
    color: "linear-gradient(135deg, rgba(127,90,240,0.55), rgba(167,139,250,0.35))"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Data Analyst at Amazon",
    text: "Zarvion rebuilt my resume from scratch and I landed three offers within a month.",
    image: "https://i.pravatar.cc/150?img=47",
    color: "linear-gradient(135deg, rgba(15,158,117,0.55), rgba(61,220,151,0.35))"
  },
  {
    id: 4,
    name: "David Park",
    role: "Backend Engineer at Netflix",
    text: "Clean formatting, sharp keywords, real results. Recruiters started reaching out to me directly.",
    image: "https://i.pravatar.cc/150?img=13",
    color: "linear-gradient(135deg, rgba(255,120,73,0.55), rgba(255,178,107,0.35))"
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "UX Designer at Adobe",
    text: "The consultation alone gave me more clarity on my career story than months of job searching.",
    image: "https://i.pravatar.cc/150?img=25",
    color: "linear-gradient(135deg, rgba(219,83,126,0.55), rgba(244,192,209,0.35))"
  },
  {
    id: 6,
    name: "B. Gordon",
    role: "CEO Founder, Archin Studio",
    text: "A rebrand is not typically done in a chaotic, archaic industry like ours, so their work has really set us apart. 10/10 for Hub's team.",
    image: "https://i.pravatar.cc/150?img=12",
    color: "linear-gradient(135deg, rgba(255,140,66,0.6), rgba(255,181,107,0.4))"
  }
];

const Testimonials = () => {
  const [order, setOrder] = useState(testimonials.map((_, i) => i));
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const draggingRef = useRef(false);

  const goNext = useCallback(() => {
    setOrder(prev => {
      const next = [...prev];
      next.push(next.shift());
      return next;
    });
    setDragX(0);
  }, []);

  const goPrev = useCallback(() => {
    setOrder(prev => {
      const next = [...prev];
      next.unshift(next.pop());
      return next;
    });
    setDragX(0);
  }, []);

  // Auto-scroll every 3 seconds, paused when the user is actively dragging
  useEffect(() => {
    if (dragging) return;
    const timer = setInterval(() => {
      goNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [dragging, goNext]);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    setDragging(true);
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      setDragX(x - startX.current);
    };

    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      setDragX(current => {
        if (current > 90) {
          goPrev();
        } else if (current < -90) {
          goNext();
        }
        return 0;
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div>
          <span className="testimonials-badge">TESTIMONIALS</span>
          <h2 className="testimonials-heading">
            What <em>our clients</em> say?
          </h2>
        </div>

        <div className="stack-wrap">
          <button className="stack-nav prev" onClick={goPrev} aria-label="Previous">
            ‹
          </button>

          <div className="stack-cards">
            {order.map((tIndex, pos) => {
              const t = testimonials[tIndex];
              const posClass = pos > 2 ? 'pos-hidden' : `pos-${pos}`;
              const isFront = pos === 0;

              const style = { ...(isFront ? { background: t.color } : {}) };
              if (isFront && dragging) {
                style.transform = `translate(${dragX}px, 0) rotate(${dragX / 20}deg)`;
                style.transition = 'none';
              }

              return (
                <div
                  key={t.id}
                  className={`stack-card ${posClass} ${isFront && dragging ? 'dragging' : ''}`}
                  style={style}
                  onMouseDown={isFront ? onPointerDown : undefined}
                  onTouchStart={isFront ? onPointerDown : undefined}
                >
                  {/* Only render the front card's content. The cards behind are
                      meant to be hidden by backdrop-filter blur, but blur support
                      is inconsistent on mobile browsers (esp. with data-saver /
                      low-resource modes), which was causing their full text to
                      show through and overlap with the front card. */}
                  {isFront && (
                    <>
                      <div className="card-quote">"</div>

                      <div className="card-body">
                        <p className="card-text">"{t.text}"</p>
                      </div>

                      <div className="card-author">
                        <div className="card-avatar">
                          <img
                            src={t.image}
                            alt={t.name}
                            draggable="false"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <span className="fallback" style={{ display: 'none' }}>
                            {t.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4>{t.name}</h4>
                          <p>{t.role}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <button className="stack-nav next" onClick={goNext} aria-label="Next">
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;