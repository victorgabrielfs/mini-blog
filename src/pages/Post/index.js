import React from 'react'
import './styles.css'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useParams } from 'react-router-dom'

const Post = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument('posts', id)

  return (
    <div className="post_container">
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>This post is about:</h3>
          <div className="tags">
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Post
