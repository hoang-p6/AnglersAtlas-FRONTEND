import { NavLink } from 'react-router-dom'
import '../App.css'
const Home = ({ user }) => {
  return user ? (
    <div>
      Get Started
      <NavLink to="/water">Fishing Spots</NavLink>
      <NavLink to="/map">Map</NavLink>
    </div>
  ) : (
    <div>
      <div>Log in to explore fishing spots!</div>
      <NavLink to="/login">Log In</NavLink>
      <div>Don't have an account? Join the family!</div>
      <NavLink to="/register">Sign Up</NavLink>
    </div>
  )
}
export default Home
