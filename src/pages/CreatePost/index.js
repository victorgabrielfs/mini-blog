import React from 'react'
import './styles.css'
import { useState } from 'react'
import { useInsertDocument } from '../../hooks/useInsertDocument'
//import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const { user } = useAuthValue()

  const { insertDocument, response } = useInsertDocument('posts')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    try {
      new URL(image)
    } catch (error) {
      setFormError('Invalid image URL')
    }

    // create tags array
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    // check values
    if (!title || !image || !tags || !body) {
      setFormError('Please fill all the fields')
    }

    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })
    navigate('/')
  }
  return (
    <div className="create_post">
      <h2>Create post</h2>
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
    </div>
  )
}

export default CreatePost
