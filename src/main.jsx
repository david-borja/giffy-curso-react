import { createHead, UnheadProvider } from '@unhead/react/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // si está importado en el html, no es necesario importarlo aquí
import App from '@/App.jsx'

const head = createHead()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <App />
    </UnheadProvider>
  </StrictMode>
)
