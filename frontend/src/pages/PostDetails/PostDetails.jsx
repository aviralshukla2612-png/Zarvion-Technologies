import React, { useEffect } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import { ARTICLE_POSTS, BLOG_POSTS } from '../../data/blogData';
import './PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  
  const isArticle = location.pathname.startsWith('/article');
  const dataSource = isArticle ? ARTICLE_POSTS : BLOG_POSTS;
  
  // Find the post that matches the ID in the URL
  const post = dataSource.find(p => p.id === parseInt(id));

  // If the post doesn't exist, redirect to the main hub
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Scroll to top when the post loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  return (
    <div className="post-details-page">
      <div className="post-container">
        
        <div className="post-header">
          <Link to="/blog" className="back-link">
            ← Back to Hub
          </Link>
          <div className="post-meta-top">
            <span className="post-badge">{isArticle ? 'ARTICLE' : 'BLOG'}</span>
            <span className="post-category">{post.category}</span>
            <span className="post-date">{post.date}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-author">
            By <strong>{post.author}</strong>
          </div>
        </div>
        
        <div className="post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
      </div>
    </div>
  );
};

export default PostDetails;
