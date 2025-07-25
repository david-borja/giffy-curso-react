import { Link, Route } from 'wouter'
import { GifsContextProvider } from '@/context/GifsContext'
import Home from '@/pages/Home'
import SearchResults from '@/pages/SearchResults'
import Detail from '@/pages/Detail'
import '@/App.css'

export default function App() {
  return (
    <GifsContextProvider>
      <div className='App'>
        <section className='App-content'>
          <Link to='/'>
            <figure className='App-logo'>
              <img alt='Giffy logo' src='/new-logo.png' />
            </figure>
          </Link>
          <Route component={Home} path='/' />
          <Route component={SearchResults} path='/search/:keyword' />
          <Route component={Detail} path='/gif/:id' />
        </section>
      </div>
    </GifsContextProvider>
  )
}
