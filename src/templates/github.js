// src/templates/blogTemplate.js
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import './github.css';

export default function BlogPostTemplate({ data }) {
  const { markdownRemark } = data || {};
  const { frontmatter, html } = markdownRemark || {};
  
  // Get initial dark mode preference from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return JSON.parse(savedMode);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Save dark mode preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      
      // Apply dark mode to document body
      document.body.classList.toggle('dark-mode', isDarkMode);
      
      // Handle syntax highlighting theme
      const lightTheme = document.querySelector('link#highlight-light');
      const darkTheme = document.querySelector('link#highlight-dark');
      
      if (lightTheme && darkTheme) {
        darkTheme.disabled = !isDarkMode;
        lightTheme.disabled = isDarkMode;
      }

      // Reinitialize syntax highlighting
      if (window.hljs) {
        window.hljs.highlightAll();
      }
    }
  }, [isDarkMode]);

  // Initialize highlight.js
  useEffect(() => {
    if (typeof window !== 'undefined' && window.hljs) {
      window.hljs.highlightAll();
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`blog-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Helmet>
        <html lang="en" className={isDarkMode ? 'dark-mode' : ''} />
        <title>{frontmatter?.title || 'Blog Post'}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"
          id="highlight-light"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css"
          id="highlight-dark"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"
        />
      </Helmet>

      <div className="content-wrapper">
        <button
          onClick={toggleDarkMode}
          className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
        >
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        
        <h1 className="post-title">
          {frontmatter?.title || 'Hello, World!'}
        </h1>
        
        <article 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: html || '<p>No content available.</p>' }} 
        />
      </div>
    </div>
  );
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;