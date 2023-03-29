import './App.css'
import axios from 'axios'
import React from 'react'
import { BASE_URL } from './services/api'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'
import Fish from './components/Fish'
import FishForm from './components/FishForm'
import LoginForm from './components/LoginForm'
import Lure from './components/Lure'
import LureForm from './components/LureForm'
import Nav from './components/Nav'
import Register from './components/Register'
import Water from './components/Water'
import WaterForm from './components/WaterForm'
import Home from './components/Home'

const App = () => {
  //Authentication state and methods
  const [user, setUser] = useState(null)
  const [waters, setWaters] = useState([])
  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }
  //Methods for fishing spots AKA Water Component
  const getAllWaters = async () => {
    const res = await axios.get(`${BASE_URL}/api/water`)
    console.log(res.data.waters)
    setWaters(res.data.waters)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Nav user={user} handleLogout={handleLogout} checkToken={checkToken} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route
            path="/water"
            element={<Water getAllWaters={getAllWaters} waters={waters} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
