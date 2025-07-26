import { lazy, Suspense } from 'react'
import { useNearScreen } from '@/hooks/useNearScreen'
import Spinner from '@/components/Spinner'

const TrendingSearches = lazy(() => import('./TrendingSearches')) // este import se resuleve con una promesa. Por eso hay que indicarle a react que el import es asíncrono con Suspense

export default function LazyTrending() {
  const { isNearScreen, fromRef } = useNearScreen()

  return (
    <div
      // id='LazyTrending'
      ref={fromRef}
    >
      <Suspense fallback={<Spinner />}>
        {isNearScreen && <TrendingSearches />}
      </Suspense>
    </div>
  )
}
