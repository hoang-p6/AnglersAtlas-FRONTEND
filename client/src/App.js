import './App.css'
import React from 'react'
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

function App() {
  const [user, setUser] = useState(null)
  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }
  const checkToken = async () => {
    const user = await CheckSession()
    console.log(user)
    setUser(user)
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
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
