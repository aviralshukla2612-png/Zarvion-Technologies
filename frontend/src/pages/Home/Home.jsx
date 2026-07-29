import React, { Suspense, lazy } from 'react';
import Loader from '../../components/Loader/Loader';

// Lazy load components for better performance
const Hero = lazy(() => import('../../components/Hero/Hero'));
const About = lazy(() => import('../../components/About/About'));
const Services = lazy(() => import('../../components/Services/Services'));
const DemandedRoles = lazy(() => import('../../components/DemandedRoles/DemandedRoles'));
const Testimonials = lazy(() => import('../../components/Testimonials/Testimonials'));
const Contact = lazy(() => import('../../components/Contact/Contact'));

const Home = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Hero />
        <About />
        <Services />
        <DemandedRoles />
        <Testimonials />
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;
