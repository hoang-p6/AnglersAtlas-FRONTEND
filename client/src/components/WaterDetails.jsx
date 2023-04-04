import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../services/api'
import '../App.css'
import LogForm from './LogForm'
import UpdateLog from './UpdateLog'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
      <div className="water-details-name">{selectedWater.name}</div>
      {/* <div>{selectedWater.type}</div> */}
      <div className="details-state">{selectedWater.state}</div>
      <div className="detail-fish-container">
        <img src={selectedWater.image} className="water-details-image" />
        <div className="mapped-fish">
          {fishList?.map((fish) => (
            <div>
              <div className="logged-fish-name">{fish.name}</div>
              <img src={fish.image} className="fish-image" />
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleFishSubmit} className="fish-chooser">
        <select onChange={handleFishChange}>
          <option className="options">Choose a fish</option>
          {allFish?.map((fish) => (
            <option value={fish._id} className="options">
              {fish.name}
              {/* <img src={fish.image} /> */}
            </option>
          ))}
        </select>
        <button type="submit" className="fish-chooser-button">
          Add
        </button>
      </form>
      <div className="log-container-container">
        <h1>FISHING LOG</h1>
        {logs?.map((log) => (
          <div className="log-container">
            <div className="poster">{log.poster}</div>

            <div className="log-description">
              {log.description}
              {log.poster && log.poster === username && !displayUpdate && (
                <div
                  onClick={() => displayUpdateForm(log._id)}
                  className="edit-button"
                >
                  Edit
                </div>
              )}
            </div>

            {displayUpdate && logId === log._id && (
              <UpdateLog
                log={log}
                deleteLog={deleteLog}
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
        <div>
          <div></div>
          <LogForm user={user} waterId={id} setLoaded={setLoaded} />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="water-details-name">{selectedWater.name}</div>
      {/* <div>{selectedWater.type}</div> */}
      <div className="details-state">{selectedWater.state}</div>
      <div className="detail-fish-container">
        <img src={selectedWater.image} className="water-details-image" />
        <div className="mapped-fish">
          {fishList?.map((fish) => (
            <div>
              <div className="logged-fish-name">{fish.name}</div>
              <img src={fish.image} className="fish-image" />
            </div>
          ))}
        </div>
      </div>

      <div className="log-container-container">
        <h1>FISHING LOG</h1>
        {logs?.map((log) => (
          <div className="log-container">
            <div className="poster">{log.poster}</div>

            <div className="log-description">{log.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WaterDetails
