import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'
import '../App.css'

const Register = () => {
  let navigate = useNavigate()
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: ''
  }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      userName: formValues.userName,
      password: formValues.password
    })
    setFormValues(initialState)
    navigate('/login')
  }
  return (
    <div className="register-form">
      <div className="register-left">
        <div className="register-signin">
          <div>Already part of the club?</div>
          <NavLink to="/login" className="register-log-link">
            Login
          </NavLink>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="register-container">
        Register
        <div className="register-name">
          <label className="register-form-firstname-label" htmlFor="firstName">
            Name
          </label>
          <input
            className="register-form-firstname"
            onChange={handleChange}
            name="firstName"
            type="text"
            value={formValues.firstName}
            required
            placeholder="First Name"
          />
          <label
            className="register-form-lastname-label"
            htmlFor="lastName"
          ></label>
          <input
            className="register-form-lastname"
            onChange={handleChange}
            name="lastName"
            type="text"
            value={formValues.lastName}
            required
            placeholder="Last Name"
          />
        </div>
        <div className="register-email">
          <label className="register-form-email-label" htmlFor="email">
            Email
          </label>
          <input
            className="register-form-email"
            onChange={handleChange}
            name="email"
            type="text"
            value={formValues.email}
            required
            placeholder="Email"
          />
        </div>
        <div className="register-username">
          {' '}
          <label className="register-form-username-label" htmlFor="userName">
            Username
          </label>
          <input
            className="register-form-username"
            onChange={handleChange}
            name="userName"
            type="text"
            value={formValues.userName}
            required
            placeholder="Username"
          />
        </div>
        <div className="register-password">
          <label className="register-form-password-label" htmlFor="password">
            Password
          </label>
          <input
            className="register-form-password"
            onChange={handleChange}
            name="password"
            type="password"
            value={formValues.password}
            required
            placeholder="Password"
          />
        </div>
        <div className="register-confirm">
          <label
            className="register-form-confirm-label"
            htmlFor="confirmPassword"
          >
            Confirm
          </label>
          <input
            className="register-form-confirm"
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            required
            placeholder="Confirm Password"
          />
        </div>
        <button
          className="create-account"
          disabled={
            !formValues.userName ||
            (!formValues.password &&
              formValues.confirmPassword === formValues.password)
          }
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default Register
