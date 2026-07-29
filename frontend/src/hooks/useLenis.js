/**
 * useLenis.js
 * Initializes Lenis smooth scroll and wires it to GSAP ScrollTrigger.
 * Import and call this hook ONCE at the top-level App or main layout.
 */
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function useLenis() {
  useEffect(() => {
    // Destroy any previous instance
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisInstance = lenis;

    // Wire Lenis → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use a named function so we can remove it from the GSAP ticker on cleanup
    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
