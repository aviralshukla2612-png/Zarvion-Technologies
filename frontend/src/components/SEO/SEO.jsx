import { useEffect } from 'react';

const BASE_URL = 'https://zarviontechnologies.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_TITLE = 'Zarvion Technologies | Global IT Staffing & Career Acceleration Solutions';
const DEFAULT_DESC = 'Zarvion Technologies is a premier IT staffing and career advisory firm. We connect elite tech professionals with high-growth global opportunities and provide tailored enterprise recruitment.';

/**
 * Reusable SEO component for managing head metadata and JSON-LD structured data.
 */
const SEO = ({
  title,
  description = DEFAULT_DESC,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  schemaData = null,
}) => {
  const fullTitle = title ? `${title} | Zarvion Technologies` : DEFAULT_TITLE;
  const canonical = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_URL}${canonicalUrl}`) : BASE_URL;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // 2. Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="title"]', 'name', 'title', fullTitle);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }
    setMetaTag('meta[name="robots"]', 'name', 'robots', robots);

    // 3. Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Zarvion Technologies');

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 6. Structured Data (JSON-LD)
    let schemaScript = document.getElementById('dynamic-seo-schema');
    if (schemaData) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-seo-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaData);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Clean up dynamic schema when unmounting if needed
      const currentSchema = document.getElementById('dynamic-seo-schema');
      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, [fullTitle, description, keywords, canonical, ogType, ogImage, robots, schemaData]);

  return null;
};

export default SEO;
