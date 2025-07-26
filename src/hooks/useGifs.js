import { useEffect, useState, useContext } from 'react'
import getGifs from '@/services/getGifs'
import GifsContext from '@/context/GifsContext'

const INITIAL_PAGE = 0

export function useGifs({ keyword } = { keyword: null }) {
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

      getGifs({ keyword: keywordToUse }).then((gifs) => {
        setGifs(gifs)
        setLoading(false)
        localStorage.setItem('lastKeyword', keyword)
      })
    },
    [keyword, keywordToUse, setGifs]
  )

  useEffect(
    function () {
      if (page === INITIAL_PAGE) return
      setLoadingNextPage(true)
      getGifs({ keyword: keywordToUse, page }).then((nextGifs) => {
        setGifs((prevGifs) => prevGifs.concat(nextGifs))
        setLoadingNextPage(false)
      })
    },
    [page, keywordToUse, setGifs]
  )

  return { loading, loadingNextPage, gifs, setPage }
}
