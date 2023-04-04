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
    <div className="water-card-container">
      {waters?.map((water) => (
        <Link
          to={`/water/${water._id}`}
          key={water._id}
          className="mapped-waters"
        >
          <div className="water-card">
            <img className="water-image" src={water.image} />
            <div className="water-card-info">
              <div className="water-name">{water.name}</div>
              <div className="water-state">{water.state}</div>
              <div className="water-fish">
                {water.species.map((fish) => (
                  <div className="fish">{fish.name}</div>
                ))}
              </div>
            </div>

            {/* <div>Location: {water.state}</div> */}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Water
