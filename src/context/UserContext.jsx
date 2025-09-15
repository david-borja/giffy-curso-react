import { createContext, useEffect, useState } from 'react'
import getFavs from '@/services/getFavs'

const Context = createContext({}) // esto es el valor por defecto si intentamos consumir este objeto y no tenemos acceso al contexto

export function UserContextProvider({ children }) {
  // acceder al sessionStorage es pesado y bloque el thread principal, por eso lo hacemos solo una vez al inicializar el estado utilizando una función. Si no lo pusiéramos, cada vez que se renderizara el componente, se accedería al sessionStorage (aunque no actualizaría el estado), lo cual es innecesario.
  const [jwt, setJwt] = useState(() => window.sessionStorage.getItem('jwt'))
  const [favs, setFavs] = useState([])

  useEffect(() => {
    if (!jwt) return setFavs([])
    getFavs({ jwt }).then(setFavs)
  }, [jwt])

  return (
    <Context.Provider value={{ favs, jwt, setFavs, setJwt }}>
      {children}
    </Context.Provider>
  )
}

export default Context
