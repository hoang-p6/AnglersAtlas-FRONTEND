import React from 'react'
import { useState, useEffect } from 'react'
import Map from 'react-map-gl'
import { Marker } from 'react-map-gl'
import { NavLink } from 'react-router-dom'
import '../App.css'
Map.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const MapPage = ({ waters }) => {
  const [viewport, setViewport] = useState({
    latitude: 33.941212,
    longitude: -84.213531,
    width: '100vw',
    height: '100vh',
    zoom: 7
  })

  useEffect(() => {}, [viewport])
  return (
    <div>
      <Map
        {...viewport}
        mapboxApiAccessToken={Map.accessToken}
        style={{ width: viewport.width, height: viewport.height }}
        mapStyle="mapbox://styles/p-hoang/clg03x7re004p01oh0nyphj76"
        onViewportChange={(viewport) => {
          setViewport(viewport)
          console.log(viewport)
        }}
      >
        {waters?.map((water) => (
          <Marker
            key={water._id}
            longitude={parseFloat(water.longitude)}
            latitude={parseFloat(water.latitude)}
          >
            <NavLink to={`/water/${water._id}`}>
              <span class="material-symbols-outlined">location_on</span>
            </NavLink>
          </Marker>
        ))}
      </Map>
    </div>
  )
}
export default MapPage
