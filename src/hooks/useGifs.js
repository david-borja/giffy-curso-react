import { useEffect, useState, useContext } from 'react'
import getGifs from '../services/getGifs'
import GifsContext from '../context/GifsContext'

export function useGifs({ keyword } = { keyword: null }) {
  const [loading, setLoading] = useState(false)
  const { gifs, setGifs } = useContext(GifsContext)

  const DEFAULT_KEYWORD = 'cat'

  useEffect(
    function () {
      setLoading(true)
      const keywordToUse =
        keyword || localStorage.getItem('lastKeyword') || DEFAULT_KEYWORD

      getGifs({ keyword: keywordToUse }).then((gifs) => {
        setGifs(gifs)
        setLoading(false)
        localStorage.setItem('lastKeyword', keyword)
      })
    },
    [keyword, setGifs]
  )

  return { loading, gifs }
}
