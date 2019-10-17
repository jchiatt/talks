import React from 'react';
import { graphql } from 'gatsby';

export const All_POSTS_QUERY = graphql`
  query AllPostsQuery {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          date
        }
        excerpt
      }
    }
  }
`

export default ({ data }) => {
  const { allMarkdownRemark: posts } = data;
  return <div>
    {posts.nodes.map(post => (
      <div key={post.id}>
        <h2>{post.frontmatter.title}</h2>
        <time>{post.frontmatter.date}</time>
        <p>{post.excerpt}</p>
      </div>
    ))}
  </div>
}
