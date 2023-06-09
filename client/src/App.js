import './App.css'
import axios from 'axios'
import React from 'react'
import { BASE_URL } from './services/api'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'

import LoginForm from './components/LoginForm'

import Nav from './components/Nav'
import Register from './components/Register'
import Water from './components/Water'

import Home from './components/Home'
import WaterDetails from './components/WaterDetails'
import MapPage from './components/Map'

const App = () => {
  //Authentication state and methods
  const [user, setUser] = useState(null)
  const [waters, setWaters] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [matchedUser, setMatchedUser] = useState([])
  const [logs, setLogs] = useState([])
  const handleLogout = () => {
    setUser(null)

    localStorage.clear()
  }
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const getAllWaters = async () => {
    const res = await axios.get(`${BASE_URL}/api/water`)
    setWaters(res.data.waters)
  }
  // console.log(user)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    getAllWaters()
  }, [loaded])
  return (
    <div className="App">
      <header>
        <Nav user={user} handleLogout={handleLogout} checkToken={checkToken} />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<LoginForm setUser={setUser} setLoaded={setLoaded} />}
          />
          <Route
            path="/water"
            element={<Water getAllWaters={getAllWaters} waters={waters} />}
          />
          <Route
            path="/water/:id"
            element={<WaterDetails waters={waters} user={user} />}
          />
          <Route path="/map" element={<MapPage waters={waters} />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
