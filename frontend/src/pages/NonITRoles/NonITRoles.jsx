import React from 'react';
import DemandedRoles from '../../components/DemandedRoles/DemandedRoles';
import SEO from '../../components/SEO/SEO';

const NON_IT_ROLES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "High-Demand Non-IT Career Roles & Opportunities",
  "description": "Explore high-growth executive, marketing, financial, and operations career roles placed by Zarvion Technologies.",
  "url": "https://zarviontechnologies.com/non-it-roles",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zarviontechnologies.com/" },
      { "@type": "ListItem", "position": 2, "name": "Non-IT Roles", "item": "https://zarviontechnologies.com/non-it-roles" }
    ]
  }
};

const NonITRoles = () => (
  <>
    <SEO
      title="High-Demand Non-IT Roles & Executive Careers"
      description="Explore rewarding non-IT career opportunities in Digital Marketing, HR Management, Financial Analysis, Sales, and Business Operations with Zarvion Technologies."
      keywords="Non-IT jobs, digital marketing manager, HR manager, financial analyst, sales executive, business analyst, corporate staffing"
      canonicalUrl="/non-it-roles"
      schemaData={NON_IT_ROLES_SCHEMA}
    />
    <DemandedRoles filter="non-it" />
  </>
);

export default NonITRoles;