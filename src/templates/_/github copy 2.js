import React from 'react';
import { graphql } from 'gatsby';

export default function BlogPostTemplate({ data }) {
  if (!data || !data.markdownRemark) {
    return <div>Error: Content not found</div>;
  }

  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <div>
      <h1>Hello TM! {frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
