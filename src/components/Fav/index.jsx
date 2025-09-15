import React from 'react'
import { useLocation } from 'wouter'
import useUser from '@/hooks/useUser'
import './styles.css'

export default function Fav({ id }) {
  const { isLogged, addFav, favs } = useUser()
  const [, navigate] = useLocation()

  const isFav = favs.some((favId) => favId === id)

  const handleClick = () => {
    if (!isLogged) return navigate('/login')
    addFav(id)
    // TO DO: remove fav
  }

  const [label, emoji, favClass] = isFav
    ? ['Remove Gif from favourites', '🗑️', 'gf-Fav fav-delete']
    : ['Add Gif to favourites', '❤️', 'gf-Fav']

  return (
    <button onClick={handleClick} className={favClass}>
      <span aria-label={label} role='img'>
        {emoji}
      </span>
    </button>
  )
}
