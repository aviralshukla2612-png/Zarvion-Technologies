import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/blogData';
import './Article.css';

const Article = () => {
  const { id } = useParams();
  
  // Find the post that matches the ID in the URL
  const post = BLOG_POSTS.find(p => p.id === parseInt(id));

  // If the post doesn't exist, redirect to the main blog page or a 404
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get 3 related articles (exclude current one)
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);

  // Scroll to top when the article loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  return (
    <div className="article-page">
      {/* ============================================================
           ARTICLE HERO
           ============================================================ */}
      <section className="article-hero">
        <div 
          className="article-hero-bg" 
          style={{ backgroundImage: `url(${post.image})` }}
        >
          <div className="article-hero-overlay" />
        </div>
        
        <div className="article-hero-content">
          <Link to="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
          <div className="article-meta">
            <span className="article-category">{post.category}</span>
            <span className="article-date">{post.date}</span>
          </div>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-author">
            <div className="author-avatar">
              {post.author.charAt(0)}
            </div>
            <div className="author-info">
              <span className="author-name">{post.author}</span>
              <span className="author-role">Content Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           ARTICLE BODY
           ============================================================ */}
      <section className="article-body-section">
        <div className="article-container">
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* ============================================================
           RELATED ARTICLES
           ============================================================ */}
      <section className="related-articles-section">
        <div className="article-container">
          <h3 className="related-title">Read Next</h3>
          <div className="related-grid">
            {relatedPosts.map((relatedPost) => (
              <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="related-card">
                <div className="related-img-wrapper">
                  <img src={relatedPost.image} alt={relatedPost.title} className="related-img" />
                </div>
                <div className="related-content">
                  <span className="related-category">{relatedPost.category}</span>
                  <h4 className="related-card-title">{relatedPost.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Article;
