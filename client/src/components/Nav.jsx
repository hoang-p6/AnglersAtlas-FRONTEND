import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import '../App.css'
const Nav = ({ user, handleLogout }) => {
  const [selectedUser, setSelectedUser] = useState('')
  const [loaded, setLoaded] = useState(false)
  const getUserById = async () => {
    const res = await axios.get(`${BASE_URL}/api/user/${user.id}`)
    setSelectedUser(res.data.user.firstName)
    setLoaded(true)
  }
  useEffect(() => {
    getUserById()
    console.log(selectedUser)
  }, [loaded, user, selectedUser])
  return user ? (
    <nav className="nav-container">
      <NavLink to="/" className="home-link">
        Home
      </NavLink>
      <NavLink to="/water" className="spots-link">
        Spots
      </NavLink>
      <NavLink to="/map" className="map-link">
        Map
      </NavLink>
      <NavLink to="/" onClick={handleLogout} className="log-link">
        Log Out
      </NavLink>
    </nav>
  ) : (
    <nav className="nav-container">
      <NavLink to="/" className="home-link">
        Home
      </NavLink>
      <NavLink to="/water" className="spots-link">
        Spots
      </NavLink>
      <NavLink to="/register" className="join-link">
        Join
      </NavLink>
      <NavLink to="/login" className="log-link">
        Login
      </NavLink>
    </nav>
  )
}

export default Nav
