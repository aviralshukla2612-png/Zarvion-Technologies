import React, { useEffect, useRef, useState } from 'react';
import './Loader.css';

// Placeholder loader imagery — swap these for real shots whenever ready.
const LOADER_IMAGES = [
  'https://loremflickr.com/500/650/coding,computer?lock=101',
  'https://loremflickr.com/500/650/server,datacenter?lock=102',
  'https://loremflickr.com/500/650/cybersecurity,network?lock=103',
  'https://loremflickr.com/500/650/office,meeting?lock=104',
];

const IMAGE_INTERVAL = 950; // ms between image crossfades — leaves room for the .65s clip-path reveal to finish

const Loader = ({ onComplete, duration = 4800 }) => {
  const [percent, setPercent] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const rafRef = useRef(null);

  // Counts 0 → 100, eased so it settles rather than ticking linearly.
  useEffect(() => {
    const start = performance.now();
    const safeDuration = Math.max(duration, 100); // guard against 0/negative duration

    const tick = (now) => {
      const elapsed = Math.max(0, now - start); // guard against a stray negative delta
      const progress = Math.min(1, Math.max(0, elapsed / safeDuration));
      const eased = 1 - Math.pow(1 - progress, 3);
      setPercent(Math.round(Math.min(100, Math.max(0, eased * 100))));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (onComplete) {
        setTimeout(onComplete, 300);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, onComplete]);

  // Cycles the centered image while loading.
  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex(i => (i + 1) % LOADER_IMAGES.length);
    }, IMAGE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-count-tl">
        <span className="loader-number">{percent}</span>
        <span className="loader-percent"></span>
      </div>

      <div className="loader-brand-tr">
        <span className="brand-white">Zarvion</span> <span className="brand-blue">Technologies</span>
      </div>

      <div className="loader-image-stage">
        {LOADER_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable="false"
            className={`loader-img ${i === imgIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      <h1 className="loader-tagline">Creating experiences beyond expectations...</h1>
    </div>
  );
};

export default Loader;