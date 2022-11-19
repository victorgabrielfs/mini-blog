import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="about">
      <h2>
        About the Mini <span>Blog</span>
      </h2>
      <p style={{ marginRight: 30, marginLeft: 30 }}>
        This project consist in a simple blog, where you can create posts, edit
        them and delete them. You can also create an account and login to the
        dashboard, where you can see all your posts and edit them. Made with
        react and firebase.
      </p>
      <Link to="/posts/create" className="btn">
        Create post
      </Link>
    </div>
  )
}

export default About
