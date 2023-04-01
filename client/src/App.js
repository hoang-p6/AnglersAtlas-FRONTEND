import './App.css'
import axios from 'axios'
import React from 'react'
import { BASE_URL } from './services/api'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'
import Fish from './components/Fish'
import LogForm from './components/LogForm'
import LoginForm from './components/LoginForm'
import Lure from './components/Lure'
import LureForm from './components/LureForm'
import Nav from './components/Nav'
import Register from './components/Register'
import Water from './components/Water'
import WaterForm from './components/WaterForm'
import Home from './components/Home'
import WaterDetails from './components/WaterDetails'

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
      <Nav user={user} handleLogout={handleLogout} checkToken={checkToken} />
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
        </Routes>
      </main>
    </div>
  )
}

export default App
