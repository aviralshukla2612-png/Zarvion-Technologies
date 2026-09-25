import React, { Suspense, lazy } from 'react';
import Loader from '../../components/Loader/Loader';
import SEO from '../../components/SEO/SEO';

// Lazy load components for better performance
const Hero = lazy(() => import('../../components/Hero/Hero'));
const About = lazy(() => import('../../components/About/About'));
const Services = lazy(() => import('../../components/Services/Services'));
const DemandedRoles = lazy(() => import('../../components/DemandedRoles/DemandedRoles'));
const Testimonials = lazy(() => import('../../components/Testimonials/Testimonials'));
const FAQ = lazy(() => import('../../components/FAQ/FAQ'));
const Contact = lazy(() => import('../../components/Contact/Contact'));

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Zarvion Technologies offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zarvion Technologies specializes in IT and Non-IT recruitment, talent acquisition, strategic consulting, and providing comprehensive staffing solutions tailored to your business needs."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the recruitment process typically take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While timelines vary depending on the complexity of the role, our extensive network allows us to typically provide qualified shortlists within 48 to 72 hours for most standard positions."
      }
    },
    {
      "@type": "Question",
      "name": "Do you hire for remote and hybrid roles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we recruit for all working models including fully remote, hybrid, and on-site positions across various industries and geographic locations."
      }
    },
    {
      "@type": "Question",
      "name": "What industries do you specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We have deep expertise in Technology and IT sectors, but we also provide dedicated recruitment services for Healthcare, Finance, E-commerce, and Engineering industries."
      }
    },
    {
      "@type": "Question",
      "name": "How do you ensure candidate quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We utilize a rigorous multi-step screening process that includes technical assessments, cultural fit evaluations, and comprehensive background checks before presenting candidates to our clients."
      }
    },
    {
      "@type": "Question",
      "name": "Are you able to handle bulk or volume hiring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We have dedicated teams structured to handle large-scale recruitment drives efficiently without compromising on the quality of hires."
      }
    }
  ]
};

const Home = () => {
  return (
    <>
      <SEO
        title="Global IT Staffing & Career Acceleration Solutions"
        description="Empowering careers and connecting global tech talent. Zarvion Technologies provides elite recruitment, career roadmap engineering, and enterprise staffing solutions."
        keywords="Zarvion Technologies, IT recruitment, global staffing, career acceleration, tech jobs, talent acquisition, resume enhancement"
        canonicalUrl="/"
        schemaData={HOME_FAQ_SCHEMA}
      />
      <Suspense fallback={<Loader />}>
        <Hero />
        <About />
        <Services />
        {/* No itOnly prop — shows the full interleaved IT + non-IT list */}
        <DemandedRoles />
        <Testimonials />
        <FAQ />
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;