import { useEffect, useState, useContext } from 'react'
import getGifs from '@/services/getGifs'
import GifsContext from '@/context/GifsContext'

const INITIAL_PAGE = 0

export function useGifs({ keyword, rating } = { keyword: null }) {
  const [loading, setLoading] = useState(false)
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [page, setPage] = useState(0)
  const { gifs, setGifs } = useContext(GifsContext)

  const DEFAULT_KEYWORD = 'cat'
  const keywordToUse =
    keyword || localStorage.getItem('lastKeyword') || DEFAULT_KEYWORD

  useEffect(
    function () {
      setLoading(true)

      getGifs({ keyword: keywordToUse, rating }).then((gifs) => {
        setGifs(gifs)
        setLoading(false)
        localStorage.setItem('lastKeyword', keywordToUse)
      })
    },
    [keyword, keywordToUse, setGifs, rating]
  )

  useEffect(
    function () {
      if (page === INITIAL_PAGE) return
      setLoadingNextPage(true)
      getGifs({ keyword: keywordToUse, page, rating }).then((nextGifs) => {
        setGifs((prevGifs) => prevGifs.concat(nextGifs))
        setLoadingNextPage(false)
      })
    },
    [page, keywordToUse, setGifs, rating]
  )

  return { loading, loadingNextPage, gifs, setPage }
}
