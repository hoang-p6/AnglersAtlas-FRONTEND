import { NavLink } from 'react-router-dom'
const Nav = ({ user, handleLogout }) => {
  return user ? (
    <nav>
      {' '}
      <NavLink to="/">Home</NavLink>
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
