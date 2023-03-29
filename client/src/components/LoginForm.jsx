import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const Login = ({ setUser }) => {
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
    setUser(payload)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        onChange={handleChange}
        name="email"
        type="email"
        value={formValues.email}
        required
        placeholder="Email"
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
      <button disabled={!formValues.email || !formValues.password}>
        Log In
      </button>
    </form>
  )
}

export default Login
