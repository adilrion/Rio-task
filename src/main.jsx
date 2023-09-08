import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { TaskContextProvider } from './context/TaskContext.jsx'
import { AuthContext } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <AuthContext>
      <TaskContextProvider>
        <App />
        </TaskContextProvider>
      </AuthContext>
      </ThemeProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
