import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../services/api'
import '../App.css'

const WaterDetails = ({ waters }) => {
  const [selectedWater, setSelectedWater] = useState({})
  const { id } = useParams()
  // const selectWater = () => {
  //   setSelectedWater(waters.find((water) => water._id === `${id}`))
  //   console.log(selectedWater)
  // }
  const getWaterById = async () => {
    const res = await axios.get(`${BASE_URL}/api/water/${id}`)
    setSelectedWater(res.data.water)
  }
  useEffect(() => {
    // selectWater()
    getWaterById()
  }, [selectedWater])

  return (
    <>
      <div>
        <div>{selectedWater.name}</div>
        <div>{selectedWater.type}</div>
        <div>{selectedWater.state}</div>
        <div>{selectedWater.species}</div>
      </div>
    </>
  )
}

export default WaterDetails
