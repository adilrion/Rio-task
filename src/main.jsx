import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { TaskContextProvider } from './context/TaskContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
