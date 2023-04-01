import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
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
    <nav>
      {' '}
      <div>Welcome {selectedUser}!</div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/water">Fishing Spots</NavLink>
      <NavLink to="/" onClick={handleLogout}>
        Log Out
      </NavLink>
    </nav>
  ) : (
    <nav className="Nav-Bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/water">Fishing Spots</NavLink>
      <NavLink to="/register">Join</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default Nav
