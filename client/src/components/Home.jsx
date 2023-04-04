import { NavLink } from 'react-router-dom'
import Carousel from './Carousel'
import '../App.css'
const Home = ({ user }) => {
  return user ? (
    <div className="loggedIn">
      <div>
        <div className="home-heading">
          <div className="welcome">The Angler's Atlas</div>
          Explore lakes in your area and see what catches the fish!
          <div className="home-buttons">
            <NavLink to="/water" className="home-spots-button">
              Fishing Spots
            </NavLink>{' '}
            <NavLink to="/map" className="home-map-button">
              Map
            </NavLink>
          </div>
        </div>
      </div>

      <Carousel className="carousel" />
    </div>
  ) : (
    <div className="loggedOut">
      <div>
        <div className="home-heading">
          <div className="welcome">The Angler's Atlas</div>
          Get Started
          <div className="loggedout-home-buttons">
            <NavLink to="/login" className="home-login-button">
              Login
            </NavLink>{' '}
            <NavLink to="/register" className="home-register-button">
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
