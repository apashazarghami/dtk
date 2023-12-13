import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthenticateProvider from './context/AuthenticateProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthenticateProvider>
      <App />
    </AuthenticateProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
