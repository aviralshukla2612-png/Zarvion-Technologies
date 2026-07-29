import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import { useLenis } from '../../hooks/useLenis';

const MainLayout = () => {
  // Initialize Lenis smooth scroll globally — wired to GSAP ScrollTrigger
  useLenis();

  return (
    <div className="layout">
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
