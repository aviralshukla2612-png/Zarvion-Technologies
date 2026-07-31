import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RoleDetails.css';

import { ROLES } from '../../components/DemandedRoles/roles';

const RoleDetails = () => {
  const { slug } = useParams();
  const [role, setRole] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundRole = ROLES.find(r => r.slug === slug);
    setRole(foundRole);
    if (foundRole) {
      document.title = `${foundRole.title} — Zarvion Technologies`;
    } else {
      document.title = 'Role Not Found — Zarvion Technologies';
    }
  }, [slug]);

  if (!role) {
    return (
      <div className="detail-page">
        <div className="detail-wrap">
          <div className="not-found">
            <h2>Role not found</h2>
            <p>We couldn't find the career page you were looking for.<br />
              <Link to="/">Return to Home</Link></p>
          </div>
        </div>
      </div>
    );
  }

  const backTo = role.type === 'it' ? '/it-roles' : '/non-it-roles';
  const backLabel = role.type === 'it' ? 'Back to IT Roles' : 'Back to Non-IT Roles';

  return (
    <div className="detail-page">
      <div className="detail-wrap">
        <Link className="back-link" to={backTo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          {backLabel}
        </Link>

        <div className="detail-card">
          <div className="detail-image">
            <img src={role.img} alt={role.title} />
          </div>
          <div className="detail-body">
            <span className="detail-category">{role.category}</span>
            <h1 className="detail-title">{role.title}</h1>
            <p className="detail-desc">{role.desc}</p>

            <div className="detail-skills">
              {role.skills.map(s => (
                <span className="skill-pill" key={s}>{s}</span>
              ))}
            </div>

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Salary</span>
                <span className="meta-value">{role.salary}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Demand</span>
                <span className="meta-value demand-value">{role.demand}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Experience</span>
                <span className="meta-value">{role.experience}</span>
              </div>
            </div>

            <Link className="detail-cta" to="/contact">
              Contact Us
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDetails;