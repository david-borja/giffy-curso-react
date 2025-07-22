import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // si está importado en el html, no es necesario importarlo aquí
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
