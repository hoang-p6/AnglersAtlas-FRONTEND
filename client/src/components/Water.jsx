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
      {waters?.map((water) => (
        <Link to={`/water/${water._id}`} key={water._id}>
          <div className="water-card">
            <img className="water-image" src={water.image} />
            <div className="water-name">{water.name}</div>
            {/* <div>Location: {water.state}</div> */}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Water
