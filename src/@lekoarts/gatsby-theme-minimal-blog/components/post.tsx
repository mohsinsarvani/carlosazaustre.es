/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Disqus, CommentCount } from "gatsby-plugin-disqus";
import React from "react"
import Layout from "./layout"
import ItemTags from "./item-tags"
import SEO from "./seo"

type PostProps = {
  data: {
    post: {
      id: string,
      slug: string
      title: string
      date: string
      tags?: {
        name: string
        slug: string
      }[]
      description?: string
      body: string
      excerpt: string
      timeToRead: number
      banner?: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
}

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map(v => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const Post = ({ data: { post } }: PostProps) => {
  let disqusConfig = {
    url: `${process.env.SITE_URL + location.pathname}`,
    identifier: post.id,
    title: post.title
  };
  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.description ? post.description : post.excerpt}
        image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
      />
      <Styled.h2>{post.title}</Styled.h2>
      <p
        sx={{
          color: `secondary`,
          mt: 3,
          a: { color: `secondary` },
          fontSize: [1, 1, 2]
        }}
      >
        <time>{post.date}</time>
        {post.tags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags} />
          </React.Fragment>
        )}
        {` — `}
        <span>{post.timeToRead} min read</span>
        {` — `}
        <span>
          <CommentCount config={disqusConfig} placeholder={"..."} />
        </span>
      </p>
      <section
        sx={{
          my: 5,
          ".gatsby-resp-image-wrapper": {
            my: [4, 4, 5],
            boxShadow: shadow.join(`, `)
          }
        }}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
        <Disqus config={disqusConfig} />
      </section>
    </Layout>
  );
}

export default Post