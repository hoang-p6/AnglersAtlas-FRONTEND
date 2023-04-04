import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
import '../App.css'

const Login = ({ setUser, setLoaded }) => {
  let navigate = useNavigate()

  const initialState = {
    email: '',
    password: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues(initialState)
    navigate('/')
    setUser(payload)
    setLoaded(true)
    // window.location.reload()
  }
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="email" className="login-email-label">
        Email
      </label>
      <input
        onChange={handleChange}
        className="login-email"
        name="email"
        type="email"
        value={formValues.email}
        required
        placeholder="Email"
      />
      <label htmlFor="password" className="login-password-label">
        Password
      </label>
      <input
        className="login-password"
        onChange={handleChange}
        name="password"
        type="password"
        value={formValues.password}
        required
        placeholder="Password"
      />
      <button
        disabled={!formValues.email || !formValues.password}
        className="login-button"
      >
        Log In
      </button>
    </form>
  )
}

export default Login
