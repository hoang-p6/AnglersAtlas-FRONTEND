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
import WaterDetails from './components/WaterDetails'

const App = () => {
  //Authentication state and methods
  const [user, setUser] = useState(null)
  const [userInfo, setUserInfo] = useState({})
  const [waters, setWaters] = useState([])
  // const [loaded, setLoaded] = useState(false)
  const handleLogout = () => {
    setUser(null)
    setUserInfo({})
    // setLoaded(false)
    localStorage.clear()
  }
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user.id)
    // setLoaded(true)
  }
  const getUserById = async () => {
    const user = await CheckSession()
    const res2 = await axios.get(`${BASE_URL}/api/user/${user.id}`)
    setUserInfo(res2.data.user)
    console.log(userInfo)
  }
  const getAllWaters = async () => {
    const res = await axios.get(`${BASE_URL}/api/water`)
    setWaters(res.data.waters)
    console.log(waters)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
      getUserById()
    }
    getAllWaters()
  }, [])
  return (
    <div className="App">
      <Nav
        user={user}
        handleLogout={handleLogout}
        checkToken={checkToken}
        userInfo={userInfo}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
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
