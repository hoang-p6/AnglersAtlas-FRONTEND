import { NavLink } from 'react-router-dom'
const Home = ({ user }) => {
  return user ? (
    <div>you are signed in</div>
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
