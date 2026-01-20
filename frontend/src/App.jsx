import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Dashboard from './pages/Dashboard'
import RunningTrades from './pages/RunningTrades'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TradeHistory from './pages/TradeHistory'

function App() {
  
  fetch("http://localhost:5000/health")
  .then(res => res.json())
  .then(data => console.log(data));

  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/running" element={<RunningTrades/>}/>
          <Route path="/history" element={<TradeHistory/>}/>
        </Routes>
     
     </BrowserRouter>
  )
}

export default App
