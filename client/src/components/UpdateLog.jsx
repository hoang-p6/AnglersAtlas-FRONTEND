import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const UpdateLog = ({
  username,
  selectedWater,
  logId,
  setLoaded,
  setDisplayUpdate,
  description,
  getLogByWaterId
}) => {
  const initialState = {
    username: username,
    description: description,
    waterId: selectedWater._id
  }

  const [logState, setLogState] = useState(initialState)

  console.log(initialState)
  console.log(logId)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${BASE_URL}/api/log/${logId}`, logState)
    setLogState(initialState)
    setLoaded(false)
    setDisplayUpdate(false)
    getLogByWaterId()
  }
  const handleChange = (e) => {
    setLogState({ ...logState, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    getLogByWaterId()
  }, [])
  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <textarea
          name="description"
          cols="50"
          rows="2"
          onChange={handleChange}
          value={logState.description}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default UpdateLog
