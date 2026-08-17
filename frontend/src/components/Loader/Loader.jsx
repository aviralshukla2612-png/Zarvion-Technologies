import React, { useEffect, useRef, useState } from 'react';
import './Loader.css';
import textLogo from '../../assets/images/ZARVION-TECHNOLOGIES-Font.png';
import img1 from '../../assets/images/loader/loader1.png';
import img2 from '../../assets/images/loader/loader2.png';
import img3 from '../../assets/images/loader/loader3.png';
import img4 from '../../assets/images/loader/loader4.png';
import img5 from '../../assets/images/loader/loader5.png';
import img6 from '../../assets/images/loader/loader6.png';

// Placeholder loader imagery — swap these for real shots whenever ready.
const LOADER_IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];

const IMAGE_INTERVAL = 950; // ms between image crossfades — leaves room for the .65s clip-path reveal to finish

const Loader = ({ onComplete, duration = 6000 }) => {
  const [percent, setPercent] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const rafRef = useRef(null);

  // Prevent scrolling while loader is active
  useEffect(() => {
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('position', 'fixed', 'important');
    document.body.style.setProperty('width', '100%', 'important');
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

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
        <img src={textLogo} alt="Zarvion Technologies" className="loader-text-logo" />
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

      <h1 className="loader-tagline">Let's connect today and discuss your futuristic growth</h1>
    </div>
  );
};

export default Loader;