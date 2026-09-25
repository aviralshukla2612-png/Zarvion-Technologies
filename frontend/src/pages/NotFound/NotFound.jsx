import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <SEO
        title="404 — Page Not Found"
        description="The requested page does not exist on Zarvion Technologies."
        robots="noindex, nofollow"
        canonicalUrl="/404"
      />
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
          <Link to="/" className="back-home-btn">
            Return to Home
          </Link>
          <Link to="/service" className="back-home-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
            Explore Services
          </Link>
          <Link to="/it-roles" className="back-home-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
            View IT Roles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
