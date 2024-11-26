import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Seo = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);

  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <p>{data.site.siteMetadata.description}</p>
      <p>Author: {data.site.siteMetadata.author}</p>
    </div>
  );
};

export default Seo;
