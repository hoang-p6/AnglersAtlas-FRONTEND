import { NavLink } from 'react-router-dom'
const Nav = () => {
  let user = false
  return user ? (
    <nav className="Nav-Bar"></nav>
  ) : (
    <nav className="Nav-Bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default Nav
