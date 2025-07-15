import { useState, useEffect } from 'react'
import Gif from './Gif'
import getGifs from '../services/getGifs'

export default function ListOfGifs({ params = {} }) {
  const { keyword } = params
  const [gifs, setGifs] = useState({ loading: false, results: [] })
  useEffect(
    function () {
      setGifs((currentGifs) => ({
        loading: true,
        results: currentGifs.results
      }))
      getGifs({ keyword }).then((gifs) =>
        setGifs({ loading: false, results: gifs })
      )
    },
    [keyword]
  )

  if (gifs.loading) return <i>Cargando</i>

  return (
    <div>
      {gifs.results.map(({ title, url, id }) => (
        <Gif
          title={title}
          id={id}
          url={url}
          key={id} // math random no, porque cada vez que se renderice el componente será un id diferente. Tiene que ser algo que identifique y que no cambie
        />
      ))}
    </div>
  )
}
