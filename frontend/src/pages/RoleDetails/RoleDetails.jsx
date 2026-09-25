import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import { ROLES } from '../../components/DemandedRoles/roles';
import './RoleDetails.css';

const RoleDetails = () => {
  const { slug } = useParams();
  const [role, setRole] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundRole = ROLES.find(r => r.slug === slug);
    setRole(foundRole);
  }, [slug]);

  if (!role) {
    return (
      <div className="detail-page">
        <SEO
          title="Role Not Found"
          description="The requested career role could not be found."
          robots="noindex, follow"
          canonicalUrl={`/roles/${slug}`}
        />
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

  const roleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Occupation",
        "name": role.title,
        "description": role.desc,
        "occupationalCategory": role.category,
        "skills": role.skills.join(', '),
        "estimatedSalary": [
          {
            "@type": "MonetaryAmountDistribution",
            "name": "base",
            "currency": "GBP",
            "duration": "P1Y",
            "value": role.salary
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zarviontechnologies.com/" },
          { "@type": "ListItem", "position": 2, "name": role.type === 'it' ? "IT Roles" : "Non-IT Roles", "item": `https://zarviontechnologies.com${backTo}` },
          { "@type": "ListItem", "position": 3, "name": role.title, "item": `https://zarviontechnologies.com/roles/${role.slug}` }
        ]
      }
    ]
  };

  return (
    <div className="detail-page">
      <SEO
        title={`${role.title} Career Opportunities & Placement`}
        description={`${role.title} roles at Zarvion Technologies: ${role.desc} Expected Salary: ${role.salary}, Experience: ${role.experience}.`}
        keywords={`${role.title}, ${role.category}, ${role.skills.join(', ')}, Zarvion tech roles, IT placement`}
        canonicalUrl={`/roles/${role.slug}`}
        schemaData={roleSchema}
      />
      <div className="detail-wrap">
        <Link className="back-link" to={backTo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          {backLabel}
        </Link>

        <div className="detail-card">
          <div className="detail-image">
            <img src={role.img} alt={`${role.title} career opportunity at Zarvion Technologies`} />
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