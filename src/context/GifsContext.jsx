import { createContext, useState } from 'react'

const Context = createContext({}) // esto es el valor por defecto si intentamos consumir este objeto y no tenemos acceso al contexto

export function GifsContextProvider({ children }) {
  const [gifs, setGifs] = useState([])
  return (
    <Context.Provider value={{ gifs, setGifs }}>{children}</Context.Provider>
  )
}

export default Context
