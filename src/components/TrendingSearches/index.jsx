import { useEffect, useState } from 'react'
import getTrendingSearches from '@/services/getTrendingSearches'
import Category from '@/components/Category'
import { useNearScreen } from '@/hooks/useNearScreen'

function TrendingSearches() {
  const [trends, setTrends] = useState([])

  useEffect(function () {
    getTrendingSearches().then(setTrends)
  }, [])

  return <Category name='Tendencias' options={trends} />
}

export default function LazyTrending() {
  const { isNearScreen, fromRef } = useNearScreen()

  return (
    <div
      // id='LazyTrending'
      ref={fromRef}
    >
      {isNearScreen && <TrendingSearches />}
    </div>
  )
}
