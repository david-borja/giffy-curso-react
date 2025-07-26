import { useEffect, useState } from 'react'
import getTrendingSearches from '@/services/getTrendingSearches'
import Category from '@/components/Category'

export default function TrendingSearches() {
  const [trends, setTrends] = useState([])

  useEffect(function () {
    getTrendingSearches().then(setTrends)
  }, [])

  return <Category name='Tendencias' options={trends} />
}
