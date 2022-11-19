import React, { useEffect } from 'react'
import './styles.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdatedocument'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [formError, setFormError] = useState()
  const { id } = useParams()
  const { document: post } = useFetchDocument('posts', id)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)
      setTags(post.tags.join(', '))
    }
  }, [post])

  const { updateDocument, response } = useUpdateDocument('posts')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    updateDocument(id, {
      title,
      image,
      body,
      tags: tags.split(',').map((tag) => tag.trim())
    })
    navigate('/dashboard')
  }
  return (
    <div className="edit_post">
      {post && (
        <>
          <h2>Edit post</h2>
          <p>Write about whatever you want and share your knowledge</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Title:</span>
              <input
                type="text"
                name="text"
                required
                placeholder="Think about a good title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>Image URL:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insert an image that represents your post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p>Image preview:</p>
            <img className="image_preview" src={post.image} alt="" />
            <label>
              <span>Content:</span>
              <textarea
                name="body"
                required
                placeholder="Insert your post content"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insert tags that describe your post"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Create post!</button>}
            {response.loading && (
              <button className="btn" disabled>
                Wait...
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  )
}

export default CreatePost
