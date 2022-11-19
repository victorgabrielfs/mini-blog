import React from 'react'
import './styles.css'
import PostDetail from '../../components/PostsDetail'
import { Link } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

const Search = () => {
  const query = useQuery()
  const search = query.get('q')
  const { documents: posts } = useFetchDocuments('posts', search)

  return (
    <div className="search_container">
      <h1>Results found for: {search}</h1>
      <div className="post-list">
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Search
