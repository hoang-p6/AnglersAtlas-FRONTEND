import axios from 'axios'
import { BASE_URL } from '../services/api'
import { useState, useEffect } from 'react'
import '../App.css'

const LogForm = ({ user, waterId, setLoaded }) => {
  const [selectedUser, setSelectedUser] = useState('')
  // const [loaded, setLoaded] = useState(false)
  const initialState = {
    poster: selectedUser,
    description: '',
    water: waterId
  }
  const [formValues, setFormValues] = useState(initialState)

  const getUserById = async () => {
    const res = await axios.get(`${BASE_URL}/api/user/${user.id}`)
    setSelectedUser(res.data.user.username)
  }
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      poster: selectedUser,
      waterId: waterId,
      [e.target.name]: e.target.value
    })
  }
  // console.log(formValues)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${BASE_URL}/api/log`, formValues)
    setLoaded(true)
    setFormValues(res.data)
    setFormValues(initialState)
  }
  useEffect(() => {
    getUserById()
  }, [user, selectedUser])
  return (
    <div>
      <form onSubmit={handleSubmit} className="log-form">
        <textarea
          className="log-catch-input"
          name="description"
          cols="50"
          rows="2"
          onChange={handleChange}
          value={formValues.description}
          placeholder="Log a catch..."
        ></textarea>
        <button type="submit" className="log-catch-button">
          Log
        </button>
      </form>
    </div>
  )
}

export default LogForm
