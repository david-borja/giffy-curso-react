import { lazy, Suspense } from 'react'
import { Link, Route } from 'wouter'
import { GifsContextProvider } from '@/context/GifsContext'
import { UserContextProvider } from '@/context/UserContext'
import Header from '@/components/Header'

import '@/App.css'

const HomePage = lazy(() => import('@/pages/Home'))
const SearchResultsPage = lazy(() => import('@/pages/SearchResults'))
const DetailPage = lazy(() => import('@/pages/Detail'))
const LoginPage = lazy(() => import('@/pages/Login'))

export default function App() {
  return (
    <UserContextProvider>
      <GifsContextProvider>
        <div className='App'>
          <section className='App-content'>
            <Header />
            <Link to='/'>
              <figure className='App-logo'>
                <img alt='Giffy logo' src='/new-logo.png' />
              </figure>
            </Link>
            <Suspense fallback={null}>
              <Route component={HomePage} path='/' />
              <Route
                component={SearchResultsPage}
                path='/search/:keyword/:rating?'
              />
              <Route component={DetailPage} path='/gif/:id' />
              <Route component={LoginPage} path='/login' />
              <Route component={() => <h1>404 ERROR :(</h1>} path='/404' />
            </Suspense>
          </section>
        </div>
      </GifsContextProvider>
    </UserContextProvider>
  )
}
