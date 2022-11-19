import React from 'react'
import './styles.css'
import { Link, NavLink } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../contexts/AuthContext'

const Navbar = () => {
  const { logout } = useAuthentication()
  const { user } = useAuthValue()
  console.log(user)

  return (
    <nav className={'navbar'}>
      <Link to="/" className={'brand'}>
        Mini <span>Blog</span>
      </Link>
      <ul className={'links_list'}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/posts/create">Create Post</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login">Sign-up</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign-in</NavLink>
            </li>
          </>
        )}

        {user && (
          <li>
            <button onClick={logout}>SignOut</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
