import React, { useState, useEffect } from 'react';
import './Blog.css';
import aiImage from '../../assets/images/roles/ai-engineer.avif';
import hrImage from '../../assets/images/roles/hr-manager.avif';
import interviewImage from '../../assets/images/roles/full-stack-developer.avif';
import socialImage from '../../assets/images/roles/digital-marketing-manager.avif';
import cyberImage from '../../assets/images/roles/cyber-security-analyst.avif';
import opsImage from '../../assets/images/roles/operations-manager.avif';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of AI in Tech Recruitment",
    excerpt: "How artificial intelligence is streamlining the talent acquisition process and what it means for job seekers.",
    category: "Technology",
    date: "Aug 12, 2026",
    image: aiImage,
    featured: true
  },
  {
    id: 2,
    title: "Navigating the Shift to Hybrid Work Models",
    excerpt: "Best practices for building strong company culture when half your team is working remotely.",
    category: "Workplace",
    date: "Jul 28, 2026",
    image: opsImage,
    featured: true
  },
  {
    id: 3,
    title: "Top 5 Soft Skills Employers Look For in 2026",
    excerpt: "Technical skills get you the interview, but soft skills get you the job. Here's what hiring managers want.",
    category: "Career Advice",
    date: "Jul 15, 2026",
    image: hrImage,
    featured: true
  },
  {
    id: 4,
    title: "Optimizing Your LinkedIn Profile for Recruiter Search",
    excerpt: "Simple tweaks to your profile that will dramatically increase your visibility to top tech recruiters.",
    category: "Career Advice",
    date: "Jul 02, 2026",
    image: socialImage,
    featured: false
  },
  {
    id: 5,
    title: "The Rise of Cybersecurity Roles",
    excerpt: "Why cybersecurity is the fastest growing sector in IT and how to transition into the field.",
    category: "Industry Trends",
    date: "Jun 18, 2026",
    image: cyberImage,
    featured: false
  },
  {
    id: 6,
    title: "Mastering the Technical Interview",
    excerpt: "A comprehensive guide to passing coding assessments and systems design rounds.",
    category: "Interview Prep",
    date: "Jun 05, 2026",
    image: interviewImage,
    featured: false
  }
];

const Blog = () => {
  const featuredPosts = BLOG_POSTS.filter(post => post.featured);
  const gridPosts = BLOG_POSTS.filter(post => !post.featured);
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
                  <button className="slide-btn">Read Article</button>
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
          <span className="section-badge">Latest News</span>
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
                <a href="#" className="blog-card-link">Read More <span>→</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
