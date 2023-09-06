import { useState } from 'react'

import './App.css'
import Home from './pages/home/Home'
import { RouterPage } from './Routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <RouterPage />
      </BrowserRouter>
    </>
  )
}

export default App
