import Head from 'next/head'
import { Fragment } from 'react'
import PostContent from '../../components/posts/post detail/post-content'

import { getPostData, getPostsFiles } from '../../lib/posts-util'

const SinglePostPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const { params } = context

  const { slug } = params

  const PostData = getPostData(slug)

  return {
    props: {
      post: PostData,
    },
    revalidate: 600,
  }
}

export async function getStaticPaths() {
  const postFileNames = getPostsFiles()

  const slugs = postFileNames.map((postFileName) =>
    postFileName.replace(/\.md$/, '')
  )

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: false,
  }
}
export default SinglePostPage
