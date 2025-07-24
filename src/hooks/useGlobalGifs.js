import { useContext } from 'react'
import GifsContext from '../context/GifsContext'

// es una buena práctica separar lo que obtenemos del contexto del resto del contexto
// lo hemos separado en un hook solo de lectura, es una buena practica a la hora de consumir un contexto
export default function useGlobalGifs() {
  return useContext(GifsContext).gifs
}
