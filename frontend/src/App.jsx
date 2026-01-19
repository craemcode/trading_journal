import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  fetch("http://localhost:5000/health")
  .then(res => res.json())
  .then(data => console.log(data));


  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Tailwind is working
      </h1>
    </div>
  )
}

export default App
