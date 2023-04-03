import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
      <form onSubmit={handleSubmit} className="register-container">
        <label htmlFor="firstName">Name</label>
        <input
          onChange={handleChange}
          name="firstName"
          type="text"
          value={formValues.firstName}
          required
          placeholder="First Name"
        />
        <label htmlFor="lastName"></label>
        <input
          onChange={handleChange}
          name="lastName"
          type="text"
          value={formValues.lastName}
          required
          placeholder="Last Name"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          value={formValues.email}
          required
          placeholder="Email"
        />
        <label htmlFor="userName">Username</label>
        <input
          onChange={handleChange}
          name="userName"
          type="text"
          value={formValues.userName}
          required
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          value={formValues.password}
          required
          placeholder="Password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          value={formValues.confirmPassword}
          required
          placeholder="Confirm Password"
        />
        <button
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
