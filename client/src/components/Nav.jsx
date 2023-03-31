import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
const Nav = ({ user, handleLogout, userInfo }) => {
  console.log(userInfo?.firstName)

  return user ? (
    <nav>
      {' '}
      <div>Welcome!</div>
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
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default Nav
