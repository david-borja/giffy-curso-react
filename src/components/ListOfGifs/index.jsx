import React from 'react'
import Gif from '@/components/Gif'
import './styles.css'

export default function ListOfGifs({ gifs }) {
  return (
    <div className='ListOfGifs'>
      {gifs.map(({ id, title, url, ...restOfInfo }) => (
        <Gif
          id={id}
          key={id}
          title={title}
          url={url}
          extraInfo={restOfInfo}
          // {...restOfInfo} esto suele ser mala práctica, ya que si el objeto tiene muchas propiedades, se pueden estar pasando props innecesarias al componente Gif. Es mejor pasar solo las props que realmente se necesitan. Y además, estás creando un nuevo objeto al vuelo, lo que va a hacer que el componente siempre se vuelva a renderizar, ya que las props siempre van a ser diferentes. Por eso, es mejor pasar solo las props que realmente se necesitan.
        />
      ))}
    </div>
  )
}
