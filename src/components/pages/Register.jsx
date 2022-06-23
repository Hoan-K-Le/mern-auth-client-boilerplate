import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function Register({ currentUser, setCurrentUser }) {
  // state for the controlled form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [name, setName] = useState('')

  // submit event handler
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // post form data to the backend
      const reqBody = {
        name,
        email,
        password,
      }

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`,
        reqBody
      )

      // save the token in localstorage
      const { token } = response.data
      localStorage.setItem('jwt', token)
      // decode the token
      const decoded = jwt_decode(token)

      // set the user in App's state to be the decoded token
      setCurrentUser(decoded)
    } catch (err) {
      console.log('error', err)
      if (err.response) {
        if (err.response.status === 400) {
          setMsg(err.response.data.msg)
        }
      }
    }
  }

  // conditionally render a navigate component
  if (currentUser) {
    return <Navigate to="/profile" />
  }

  return (
    <div>
      <h1>Register for an account</h1>

      <p>{msg}</p>

      <label htmlFor="name">name:</label>
      <input
        type="name"
        id="name"
        placeholder="your name.."
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        placeholder="your email.."
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">password:</label>
      <input
        type="password"
        id="password"
        placeholder="your password.."
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <form onSubmit={handleSubmit}>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
