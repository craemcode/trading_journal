import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import NewTrade from './pages/NewTrade'
import Dashboard from './pages/Dashboard'
import RunningTrades from './pages/RunningTrades'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TradeHistory from './pages/TradeHistory'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  
  fetch("http://localhost:5000/health")
  .then(res => res.json())
  .then(data => console.log(data));

  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/new_trade" element={<NewTrade/>}/>

          <Route path="/running" element={<RunningTrades/>}/>
          <Route path="/history" element={<TradeHistory/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
     
     </BrowserRouter>
  )
}

export default App
