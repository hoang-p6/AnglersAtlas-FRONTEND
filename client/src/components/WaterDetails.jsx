import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../services/api'
import '../App.css'

const WaterDetails = ({ waters }) => {
  const [selectedWater, setSelectedWater] = useState([])
  const [fish, setFish] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [matchedFish, setMatchedFish] = useState([])
  const { id } = useParams()

  const getWaterByIdandFish = async () => {
    const res = await axios.get(`${BASE_URL}/api/water/${id}`)
    setSelectedWater(res.data.water)
    const res2 = await axios.get(`${BASE_URL}/api/fish`)
    setFish(res2.data.fish)

    setLoaded(true)
  }
  const getSpecies = () => {
    const species = selectedWater?.species
    setMatchedFish(
      fish?.filter((each) => species.includes(each._id.toString()))
    )

    console.log(matchedFish)
  }
  useEffect(() => {
    getWaterByIdandFish()
    getSpecies()
  }, [loaded])

  return (
    <div>
      <div>{selectedWater.name}</div>
      <div>{selectedWater.type}</div>
      <div>{selectedWater.state}</div>
      {matchedFish?.map((fish) => (
        <div key={fish._id}>{fish.name}</div>
      ))}
    </div>
  )
}

export default WaterDetails
