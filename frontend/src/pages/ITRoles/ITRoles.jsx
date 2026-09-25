import React from 'react';
import DemandedRoles from '../../components/DemandedRoles/DemandedRoles';
import SEO from '../../components/SEO/SEO';

const IT_ROLES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "High-Demand IT Career Roles & Opportunities",
  "description": "Explore high-growth IT engineering and tech careers placed by Zarvion Technologies, including Full Stack Development, Cloud Engineering, DevOps, and AI.",
  "url": "https://zarviontechnologies.com/it-roles",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zarviontechnologies.com/" },
      { "@type": "ListItem", "position": 2, "name": "IT Roles", "item": "https://zarviontechnologies.com/it-roles" }
    ]
  }
};

const ITRoles = () => (
  <>
    <SEO
      title="High-Demand IT Roles & Tech Careers"
      description="Discover high-paying IT roles in AI, Cloud Engineering, Full Stack Development, Cybersecurity, and Data Science placed by Zarvion Technologies."
      keywords="IT roles, tech jobs, full stack developer careers, cloud engineer, AI engineer, cybersecurity analyst, tech talent staffing"
      canonicalUrl="/it-roles"
      schemaData={IT_ROLES_SCHEMA}
    />
    <DemandedRoles filter="it" />
  </>
);

export default ITRoles;