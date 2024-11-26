import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <div style={{ marginLeft: 20}}>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/hello-world.md/" }) {
      frontmatter {
        title
      }
      html
    }
  }
`

export default IndexPage
