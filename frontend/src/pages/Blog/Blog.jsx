import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import { ARTICLE_POSTS, BLOG_POSTS } from '../../data/blogData';
import './Blog.css';

const BLOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Zarvion Technologies Blog & Career Insights",
  "description": "Expert insights on tech careers, AI in recruitment, hybrid work models, interview strategies, and cybersecurity trends.",
  "url": "https://zarviontechnologies.com/blog",
  "publisher": {
    "@type": "Organization",
    "name": "Zarvion Technologies",
    "logo": "https://zarviontechnologies.com/ZARVION%20TECHNOLOGIES%20ORG.png"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zarviontechnologies.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog & Insights", "item": "https://zarviontechnologies.com/blog" }
    ]
  }
};

const Blog = () => {
  const featuredPosts = ARTICLE_POSTS;
  const gridPosts = BLOG_POSTS;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  return (
    <div className="blog-page">
      <SEO
        title="Blog & Insights | Tech Recruitment & Career Trends"
        description="Stay ahead with tech career advice, AI recruitment developments, interview preparation tips, and industry trends from Zarvion Technologies experts."
        keywords="Tech blog, career advice, AI recruitment, interview preparation, software engineering careers, Zarvion insights"
        canonicalUrl="/blog"
        schemaData={BLOG_SCHEMA}
      />

      {/* ============================================================
           HERO SLIDER
           ============================================================ */}
      <section className="blog-hero">
        <div className="slider-container">
          {featuredPosts.map((post, index) => {
            const isActive = index === currentSlide;
            return (
              <div 
                key={post.id} 
                className={`slide ${isActive ? 'active' : ''}`}
              >
                <div 
                  className="slide-bg" 
                  style={{ backgroundImage: `url(${post.image})` }}
                >
                  <div className="slide-overlay" />
                </div>
                
                <div className="slide-content">
                  <div className="slide-meta">
                    <span className="slide-category">{post.category}</span>
                    <span className="slide-date">{post.date}</span>
                  </div>
                  <h1 className="slide-title">{post.title}</h1>
                  <p className="slide-excerpt">{post.excerpt}</p>
                  <Link to={`/article/${post.id}`} className="slide-btn">Read Article</Link>
                </div>
              </div>
            );
          })}

          {/* Slider Controls */}
          <div className="slider-controls">
            <div className="slider-dots">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           BLOG GRID
           ============================================================ */}
      <section className="blog-grid-section">
        <div className="blog-container">
          <div className="section-header">
            <h2 className="section-title">Latest Articles &amp; Insights</h2>
            <p className="section-subtitle">Deep dives into tech recruitment, career roadmapping, and interview tactics.</p>
          </div>

          <div className="blog-grid">
            {gridPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="card-image-wrapper">
                  <img src={post.image} alt={post.title} className="card-image" loading="lazy" />
                  <span className="card-category-tag">{post.category}</span>
                </div>
                <div className="card-body">
                  <span className="card-date">{post.date}</span>
                  <h3 className="card-title">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="card-excerpt">{post.excerpt}</p>
                  <div className="card-footer">
                    <span className="card-author">By {post.author}</span>
                    <Link to={`/blog/${post.id}`} className="read-more-link">
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
