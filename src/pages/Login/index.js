import React from 'react'
import { useState } from "react";
import { useAuthentication } from '../../hooks/useAuthentication';
import './styles.css'

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { loading, error, login } = useAuthentication();

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <p>Login to use the system</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Your e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {!loading && <button className="btn">Login</button>}
        {loading && (
          <button className="btn" disabled>
            Please wait...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login