import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { ARTICLE_POSTS, BLOG_POSTS } from '../../data/blogData';

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
        <div className="section-header">
          <span className="section-badge">Latest Blogs</span>
          <h2 className="section-title">Insights & <span>Updates</span></h2>
        </div>

        <div className="blog-grid">
          {gridPosts.map((post, index) => (
            <article 
              key={post.id} 
              className="blog-card" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="blog-card-img-wrapper">
                <img src={post.image} alt={post.title} className="blog-card-img" />
                <span className="blog-card-category">{post.category}</span>
              </div>
              <div className="blog-card-content">
                <span className="blog-card-date">{post.date}</span>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-card-link">Read More <span>→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
