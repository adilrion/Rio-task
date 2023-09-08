import { useState } from 'react'

import './App.css'
import Home from './pages/home/Home'
import { RouterPage } from './Routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    
        <RouterPage />
   
    </>
  )
}

export default App
