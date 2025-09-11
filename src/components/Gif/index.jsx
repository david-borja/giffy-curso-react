import { Link } from 'wouter'
import { memo } from 'react'
import './styles.css'
import Fav from '@/components/Fav'

function Gif({ title, id, url }) {
  return (
    <div className='Gif'>
      <div className='Gif-buttons'>
        <Fav id={id}></Fav>
      </div>
      <Link to={`/gif/${id}`} className='Gif-link'>
        <h4>{title}</h4>
        <img loading='lazy' alt={title} src={url} />
      </Link>
    </div>
  )
}

// usando React.memo evitamos que se vuelva a renderizar la lista completa de gifs. De este modo, solo se añadirán los nuevos gifs que se vayan añadiendo a la lista.
export default memo(Gif, (prevProps, nextProps) => {
  // en este caso, podemos comparar las props id, ya que es un identificador único para cada gif. Si el id no ha cambiado, no es necesario volver a renderizar el componente, ya que el title y la url también será la misma. Y así solucionamos el problema de que se vuelva a renderizar cuando le pasamos un extraInfo con una nueva referencia.
  return prevProps.id === nextProps.id
})
