import React, { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const FAQ_DATA = [
  {
    question: "What services does Zarvion Technologies offer?",
    answer: "Zarvion Technologies specializes in IT and Non-IT recruitment, talent acquisition, strategic consulting, and providing comprehensive staffing solutions tailored to your business needs."
  },
  {
    question: "How long does the recruitment process typically take?",
    answer: "While timelines vary depending on the complexity of the role, our extensive network allows us to typically provide qualified shortlists within 48 to 72 hours for most standard positions."
  },
  {
    question: "Do you hire for remote and hybrid roles?",
    answer: "Yes, we recruit for all working models including fully remote, hybrid, and on-site positions across various industries and geographic locations."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We have deep expertise in Technology and IT sectors, but we also provide dedicated recruitment services for Healthcare, Finance, E-commerce, and Engineering industries."
  },
  {
    question: "How do you ensure candidate quality?",
    answer: "We utilize a rigorous multi-step screening process that includes technical assessments, cultural fit evaluations, and comprehensive background checks before presenting candidates to our clients."
  },
  {
    question: "Are you able to handle bulk or volume hiring?",
    answer: "Absolutely. We have dedicated teams structured to handle large-scale recruitment drives efficiently without compromising on the quality of hires."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`faq-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="faq-wrap">
        <div className="faq-header reveal-item">
          <span className="faq-badge">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L6 21l1.7-7-5.4-4.7 7.1-.6z"/></svg>
            GOT QUESTIONS?
          </span>
          <h2 className="faq-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="faq-desc">
            Everything you need to know about our recruitment process and strategies.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                className={`faq-item reveal-item ${isActive ? 'active' : ''}`} 
                key={index}
                style={{ transitionDelay: `${0.1 + (index * 0.1)}s` }}
              >
                <button 
                  className="faq-question" 
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isActive}
                >
                  {faq.question}
                  <span className="faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div 
                  className="faq-answer-wrapper"
                  style={{ height: isActive ? 'auto' : '0px', opacity: isActive ? 1 : 0 }}
                >
                  <p className="faq-answer">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
