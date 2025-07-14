import { useState } from 'react'
import './App.css'
import ListOfGifs from './components/ListOfGifs'

import { Route, Link } from 'wouter'

export default function App() {
  const [keyword, setKeyword] = useState('peru')
  return (
    <div className='App'>
      <section className='App-content'>
        <h1>App</h1>
        <Link to='/gif/panda'>Gif de pandas</Link>
        <Link to='/gif/ecuador'>Gif de ecuador</Link>
        <Link to='/gif/chile'>Gif de chile</Link>
        <Route path='/gif/:keyword' component={ListOfGifs} />
        <button onClick={() => setKeyword('panda')}>Cambiar keyword</button>
        <ListOfGifs keyword={keyword} />
      </section>
    </div>
  )
}
