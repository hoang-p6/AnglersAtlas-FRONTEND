import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import { Link } from 'react-router-dom'
import '../App.css'
const Water = ({ getAllWaters, waters }) => {
  const { id } = useParams()

  useEffect(() => {
    getAllWaters()
  }, [])

  return (
    <div>
      {waters.map((water) => (
        <Link to={`/water/${water._id}`}>
          <div className="water-card" key={water._id}>
            <div>{water.name}</div>
            <div>State: {water.state}</div>
            <div>Type of Body: {water.type}</div>
            <img className="water-image" src={water.image} />
            <div>{water.species}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Water
