import React, { useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import './styles.css'

const Register = () => {
  const [displayName, setDisplayName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState()

  const { loading, error: authError, createUser } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    await createUser({ displayName, email, password })
  }
  return (
    <div className="register">
      <h1>Register</h1>
      <p>Create you user and share your stories</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Your name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
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
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {!loading && <button className="btn">Register</button>}
        {loading && (
          <button className="btn" disabled>
            Please wait...
          </button>
        )}
        {error && <p className="error">{error}</p>}
        {authError && <p className="error">{authError}</p>}
      </form>
    </div>
  )
}

export default Register
