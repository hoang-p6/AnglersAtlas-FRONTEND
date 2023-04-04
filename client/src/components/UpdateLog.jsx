import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import '../App.css'

const UpdateLog = ({
  username,
  selectedWater,
  logId,
  setLoaded,
  setDisplayUpdate,
  description,
  getLogByWaterId,
  deleteLog,
  log
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
          className="update-input"
          name="description"
          cols="50"
          rows="2"
          onChange={handleChange}
          value={logState.description}
        ></textarea>
        <div className="update-log-buttons">
          <button type="submit" className="save-update-button">
            Save
          </button>
          <button onClick={() => deleteLog(log)} className="delete-log-button">
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateLog
