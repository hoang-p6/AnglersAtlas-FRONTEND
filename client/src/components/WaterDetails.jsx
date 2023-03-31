import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../services/api'
import '../App.css'

const WaterDetails = ({ waters, user }) => {
  const [selectedWater, setSelectedWater] = useState([])
  const [fish, setFish] = useState([])
  const [logs, setLogs] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [matchedFish, setMatchedFish] = useState([])
  const [matchedLog, setMatchedLog] = useState([])
  // const [formValues, setFormValues] = useState({})
  // const [fishForm, setFishForm] = useState(false)
  const { id } = useParams()
  // const initialValue = {
  //   name:'',
  //   species:''

  // }
  //   const createFish = async (e) => {
  //     e.preventDefault()
  //     const res = await axios.post(`${BASE_URL}/api/fish`, formValues)
  //     console.log(res)
  //   }
  const getInfo = async () => {
    const res = await axios.get(`${BASE_URL}/api/water/${id}`)
    setSelectedWater(res.data.water)
    const res2 = await axios.get(`${BASE_URL}/api/fish`)
    setFish(res2.data.fish)
    const res3 = await axios.get(`${BASE_URL}/api/log`)
    setLogs(res3.data.log)

    setLoaded(true)
  }
  const matchInfo = () => {
    const species = selectedWater?.species
    setMatchedFish(
      fish?.filter((each) => species.includes(each._id.toString()))
    )
    const specLog = selectedWater?.log
    setMatchedLog(logs?.filter((each) => specLog.includes(each._id.toString())))
    console.log(matchedLog)
  }

  // }
  // const toggleFishForm =()=>{
  //   setFishForm(true)
  // }
  // const handleChange = (e) => {
  //   setFormValues({
  //     ...formValues,
  //     [e.target.name]: e.target.value,
  //     [e.target.id]: e.target.value
  //   })
  //   setLoaded(false)
  // }
  useEffect(() => {
    getInfo()
    matchInfo()
  }, [loaded])

  return user ? (
    <div>
      <div>{selectedWater.name}</div>
      <div>{selectedWater.type}</div>
      <img src={selectedWater.image} />
      <div>{selectedWater.state}</div>
      {matchedFish?.map((fish) => (
        <div key={fish._id}>
          <div>{fish.name}</div>
          <img src={fish.image} />
        </div>
      ))}
      {matchedLog?.map((log) => (
        <div key={log._id}>
          <div>{log.description}</div>
        </div>
      ))}
      {/* <button onClick={toggleFishForm}>Add a fish</button>
      <form>
        <label htmlFor='name'></label>
        <input name='name' value={formValues.name}></input>
        <label htmlFor='species'></label>
        <input name='species' value={formValues.species}></input>
      </form> */}
    </div>
  ) : (
    <div>
      <div>{selectedWater.name}</div>
      <div>{selectedWater.type}</div>
      <div>{selectedWater.state}</div>
      {matchedFish?.map((fish) => (
        <div key={fish._id}>
          <div>{fish.name}</div>
          <img src={fish.image} />
        </div>
      ))}
      <div>Sign in to log a catch!</div>
    </div>
  )
}

export default WaterDetails
