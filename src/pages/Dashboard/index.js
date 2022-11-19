import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../contexts/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = () => {
  const { user } = useAuthValue()
  const { documents: posts } = useFetchDocuments('posts', null, user.uid)
  const { deleteDocument } = useDeleteDocument('posts')
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Manage your posts</p>
      {posts && posts.length === 0 ? (
        <div className="noposts">
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Create first post
          </Link>
        </div>
      ) : (
        <div className="post_header">
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div className="post_row" key={post.id}>
            <p>{post.title}</p>
            <div className="actions">
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ver
              </Link>
              <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                Editar
              </Link>
              <button
                onClick={() => {
                  deleteDocument(post.id)
                }}
                className="btn btn-outline btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Dashboard
