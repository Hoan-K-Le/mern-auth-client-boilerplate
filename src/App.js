import {
BrowserRouter as Router,
Routes,
Route,
Navigate
} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import './App.css';
import jwt_decode from 'jwt-decode'


function App() {
  // the currently logged in user will stored up here in state
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect -- if the user navigates away from the page, we will log them back in
  useEffect(() => {
    //  check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if(token) {
      // if so, we will decode it and set the user in the app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])
  // event handler to log the user out when needed
  const handleLogOut = () => {
    // check to see if a token exist in a local storage
    if(localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }

    
  }
  return (
    <Router>
      <header>
        <Navbar 
          currentUser={currentUser}
          handleLogOut={handleLogOut}
        />
      </header>

      <div className="App">  
        <Routes>
          <Route 
            path='/'
            element={<Welcome />}
            />
          <Route 
            path='/register'
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
            />
          <Route 
            path='/login'
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
            />
            {/* TODO: conditionally render auth locked routes */}
          <Route 
            path='/profile'
            element={currentUser ?  <Profile handleLogout={handleLogOut} currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Navigate to='/login'/> }
            />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
