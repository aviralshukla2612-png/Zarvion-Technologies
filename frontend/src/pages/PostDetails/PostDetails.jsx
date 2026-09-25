import React, { useEffect } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import { ARTICLE_POSTS, BLOG_POSTS } from '../../data/blogData';
import './PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  
  const isArticle = location.pathname.startsWith('/article');
  const dataSource = isArticle ? ARTICLE_POSTS : BLOG_POSTS;
  
  // Find the post that matches the ID in the URL
  const post = dataSource.find(p => p.id === parseInt(id));

  // Scroll to top when the post loads
  useEffect(() => {
    if (post) {
      window.scrollTo(0, 0);
    }
  }, [post]);

  // If the post doesn't exist, redirect to the main hub
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonicalPath = `/blog/${post.id}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": post.author || "Zarvion Technologies"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zarvion Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zarviontechnologies.com/ZARVION%20TECHNOLOGIES%20ORG.png"
      }
    },
    "datePublished": post.date,
    "url": `https://zarviontechnologies.com${canonicalPath}`,
    "mainEntityOfPage": `https://zarviontechnologies.com${canonicalPath}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zarviontechnologies.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://zarviontechnologies.com/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://zarviontechnologies.com${canonicalPath}` }
      ]
    }
  };

  return (
    <div className="post-details-page">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, tech careers, Zarvion blog, ${post.title}`}
        canonicalUrl={canonicalPath}
        ogType="article"
        schemaData={articleSchema}
      />
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
