import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import RoleDetails from './pages/RoleDetails/RoleDetails';
import NotFound from './pages/NotFound/NotFound';
import About from './components/About/About';
import DemandedRoles from './components/DemandedRoles/DemandedRoles';
import Services from './components/Services/Services';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails';
import Contact from './components/Contact/Contact';
import Careers from './components/Careers/Careers';
import ITRoles from './pages/ITRoles/ITRoles';
import NonITRoles from './pages/NonITRoles/NonITRoles';
import Blog from './pages/Blog/Blog';
import PostDetails from './pages/PostDetails/PostDetails';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Terms from './pages/Terms/Terms';
import Loader from './components/Loader/Loader';

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Stop lenis while loading to hide scrollbar
    if (isAppLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, [isAppLoading]);

  return (
    <>
      {isAppLoading && (
        <Loader onComplete={() => setIsAppLoading(false)} duration={4800} />
      )}
      <div style={isAppLoading ? { height: '100vh', overflow: 'hidden' } : {}}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="roles/:slug" element={<RoleDetails />} />
              <Route path="about" element={<div className="page-spacer"><About /></div>} />
              <Route path="demand" element={<div className="page-spacer"><DemandedRoles /></div>} />
              <Route path="service" element={<div className="page-spacer"><Services /></div>} />
              <Route path="services/:slug" element={<ServiceDetails />} />
              <Route path="contact" element={<div className="page-spacer"><Contact /></div>} />
              <Route path="careers" element={<div className="page-spacer"><Careers /></div>} />
              <Route path="*" element={<NotFound />} />
              <Route path="/it-roles" element={<div className="page-spacer"><ITRoles /></div>} />
              <Route path="/non-it-roles" element={<div className="page-spacer"><NonITRoles /></div>} /> 
              <Route path="/blog" element={<div className="page-spacer"><Blog /></div>} /> 
              <Route path="/blog/:id" element={<div className="page-spacer"><PostDetails /></div>} />
              <Route path="/article/:id" element={<div className="page-spacer"><PostDetails /></div>} />
              <Route path="/privacy-policy" element={<div className="page-spacer"><PrivacyPolicy /></div>} />
              <Route path="/terms" element={<div className="page-spacer"><Terms /></div>} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;