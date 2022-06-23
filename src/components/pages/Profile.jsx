import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Profile({ currentUser, handleLogout }) {
  // state for the secret msg aka user priviledge data
  const [msg, setMsg] = useState('')
  // useEffect for getting the uusuer data and checking auth
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the token from the local storage
        const token = localStorage.getItem('jwt')
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        }
        // hit the auth locked endpoint
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`,
          options
        )
        // example POST with auth headers (options are always last argument)
        // await axios.post(url, requestBody(form data), options)
        setMsg(response.data.msg)
        // set the secret user message in state
      } catch (err) {
        // if the error is a 401 -- that means the auth failed
        console.warn(err)
        if (err.response.status === 401) {
          // panic!
          handleLogout()
        }
      }
    }
    fetchData()
  })
  return (
    <div>
      <h1>Hello, {currentUser.name}</h1>
      <p>your email is {currentUser.email}</p>

      <h2>
        Here is the secret message that is only available to users of User App:
      </h2>

      <h3>{msg}</h3>
    </div>
  )
}
