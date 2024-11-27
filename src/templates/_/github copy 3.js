import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import './github.css'; // Optional: Place extracted custom styles here.

export default function BlogPostTemplate({ data }) {
  const { markdownRemark } = data || {};
  const { frontmatter, html } = markdownRemark || {};

  // Highlight.js initialization
  useEffect(() => {
    if (window.hljs) {
      window.hljs.highlightAll();
    }
  }, []);

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
        <div style={{ padding: '20px' }}>
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
