import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import './github.css';

export default function BlogPostTemplate({ data }) {
  const { markdownRemark } = data || {};
  const { frontmatter, html } = markdownRemark || {};
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Highlight.js initialization
  useEffect(() => {
    if (window.hljs) {
      window.hljs.highlightAll();
    }
  }, [isDarkMode]); // Re-run syntax highlighting when theme changes

  // Toggle between light and dark themes
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    const lightTheme = document.getElementById('highlight-light');
    const darkTheme = document.getElementById('highlight-dark');

    if (isDarkMode) {
      darkTheme.disabled = true;
      lightTheme.disabled = false;
    } else {
      darkTheme.disabled = false;
      lightTheme.disabled = true;
    }
  };

  return (
    <html lang="en">
      <head>
        <title>{frontmatter ? frontmatter.title : 'Untitled'}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"
          id="highlight-light"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css"
          id="highlight-dark"
          disabled
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"
          defer
        ></script>
      </head>
      <body>
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <button
            onClick={toggleDarkMode}
            style={{
              padding: '10px 15px',
              backgroundColor: isDarkMode ? '#24292e' : '#f6f8fa',
              color: isDarkMode ? '#f6f8fa' : '#24292e',
              border: '1px solid #e1e4e8',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
          <h1 style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif' }}>
            {frontmatter ? frontmatter.title : 'Hello, World!'}
          </h1>
          <article dangerouslySetInnerHTML={{ __html: html || '<p>No content available.</p>' }} />
        </div>
      </body>
    </html>
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
