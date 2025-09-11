import React from 'react'
import { useLocation } from 'wouter'
import useUser from '@/hooks/useUser'

import './styles.css'
export default function Fav({ id }) {
  const { isLogged } = useUser()
  const [, navigate] = useLocation()

  const handleClick = () => {
    if (!isLogged) return navigate('/login')
    alert(id)
  }

  return (
    <button onClick={handleClick} className='gf-Fav'>
      <span aria-label='Fav Gif' role='img'>
        ❤️
      </span>
    </button>
  )
}
