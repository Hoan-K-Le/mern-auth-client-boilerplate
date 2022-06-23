import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogOut }) {
  const loggedIn = (
    <>
      <Link to="/">
        <span onClick={handleLogOut}>Logout</span>
      </Link>

      <Link to="/profile">Profile</Link>
    </>
  )

  const loggedOut = (
    <>
      {/* if the user is not logged in... */}
      <Link to="/register">Register</Link>

      <Link to="/login">Login</Link>
    </>
  )

  return (
    <nav>
      {/* user always sees this section */}
      <Link to="/">
        <p>User App</p>
      </Link>
      {/* if the user is logged in */}
      {currentUser ? loggedIn : loggedOut}
    </nav>
  )
}
