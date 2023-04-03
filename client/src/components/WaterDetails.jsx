import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../services/api'
import '../App.css'
import LogForm from './LogForm'
import UpdateLog from './UpdateLog'
const WaterDetails = ({ waters, user }) => {
  const [selectedWater, setSelectedWater] = useState([])
  const [fishList, setFishList] = useState([])
  const [logs, setLogs] = useState([])
  const [logId, setLogId] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [username, setUsername] = useState('')
  const [displayUpdate, setDisplayUpdate] = useState(false)
  const [allFish, setAllFish] = useState([])

  const { id } = useParams()

  const fishState = fishList

  const [newFishId, setNewFishId] = useState(fishState)
  const getInfo = async () => {
    const waterRes = await axios.get(`${BASE_URL}/api/water/${id}`)
    setSelectedWater(waterRes.data.water)
    setFishList(waterRes.data.water.species)
    // setLogs(waterRes.data.water.log)
    // console.log(logs)
  }
  const getAllFish = async () => {
    const res = await axios.get(`${BASE_URL}/api/fish`)
    setAllFish(res.data.fish)
  }
  const getLogByWaterId = async () => {
    const res = await axios.get(`${BASE_URL}/api/log/${id}`)
    setLogs(res.data.log)
  }
  const getUserById = async () => {
    const res = await axios.get(`${BASE_URL}/api/user/${user.id}`)
    setUsername(res.data.user.username)
  }
  const displayUpdateForm = async (logId) => {
    setLogId(logId)
    setDisplayUpdate(true)
    console.log(logId)
  }
  const deleteLog = async (logId) => {
    console.log(logId)
    await axios.delete(`${BASE_URL}/api/log/${logId._id}`)
    getLogByWaterId()
    setLoaded(true)
  }
  const handleFishSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.put(`${BASE_URL}/api/water/${id}`, newFishId)
    console.log(res)
    // setNewFishId(fishState)
    setLoaded(true)
  }

  const handleFishChange = async (e) => {
    const res = await axios.get(`${BASE_URL}/api/fish/${e.target.value}`)
    setNewFishId({
      species: [...fishState, res.data.fish]
    })
    console.log(newFishId)
  }
  // console.log(selectedWater)
  // console.log(fishState)
  useEffect(() => {
    getInfo()
    getLogByWaterId()
    getUserById()
    getAllFish()
  }, [loaded])

  return user ? (
    <div>
      <div>{selectedWater.name}</div>
      <div>{selectedWater.type}</div>
      <img src={selectedWater.image} />
      <div>{selectedWater.state}</div>
      {fishList?.map((fish) => (
        <div>
          <div>{fish.name}</div>
          <img src={fish.image} />
        </div>
      ))}
      <form onSubmit={handleFishSubmit}>
        <select onChange={handleFishChange}>
          <option>Choose a fish</option>
          {allFish?.map((fish) => (
            <option value={fish._id}>
              {fish.name}
              {/* <img src={fish.image} /> */}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>

      <h1>FISHING LOG</h1>
      {logs?.map((log) => (
        <div>
          <div>{log.poster}:</div>
          <div>{log.description}</div>
          {log.poster && log.poster === username && !displayUpdate && (
            <div>
              <button onClick={() => deleteLog(log)}>Delete</button>
              <button onClick={() => displayUpdateForm(log._id)}>Update</button>
            </div>
          )}
          {displayUpdate && logId === log._id && (
            <UpdateLog
              username={username}
              selectedWater={selectedWater}
              setLoaded={setLoaded}
              setDisplayUpdate={setDisplayUpdate}
              description={log.description}
              logId={logId}
              getLogByWaterId={getLogByWaterId}
            />
          )}
        </div>
      ))}
      <LogForm user={user} waterId={id} setLoaded={setLoaded} />
    </div>
  ) : (
    <div>
      <div>{selectedWater.name}</div>
      <div>{selectedWater.type}</div>
      <img src={selectedWater.image} />
      <div>{selectedWater.state}</div>
      {fishList?.map((fish) => (
        <div>
          <div>{fish.name}</div>
          <img src={fish.image} />
        </div>
      ))}
      <h1>FISHING LOG</h1>
      {logs?.map((log) => (
        <div>
          <div>{log.poster}:</div>
          <div>{log.description}</div>
        </div>
      ))}
    </div>
  )
}

export default WaterDetails
