import React, { useState } from 'react'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetail from '../../components/PostsDetail'

const Home = () => {
  const navigate = useNavigate()

  const [query, setQuery] = useState('posts')

  const { documents: posts, loading } = useFetchDocuments('posts')

  function handleSubmit(e) {
    e.preventDefault()
    navigate(`/posts/search?q=${query}`)
  }

  return (
    <div className="home">
      <h1>Check our most recent posts</h1>
      <form className="search_form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div className="post-list">
        {loading && <p>Loading...</p>}
        {posts && posts.length === 0 && (
          <div className="noposts">
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Create first post
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Home
