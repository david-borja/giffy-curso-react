import { useState } from 'react'
import './App.css'
import ListOfGifs from './components/ListOfGifs'

export default function App() {
  const [keyword, setKeyword] = useState('peru')
  return (
    <div className='App'>
      <section className='App-content'>
        <button onClick={() => setKeyword('panda')}>Cambiar keyword</button>
        <ListOfGifs keyword={keyword} />
      </section>
    </div>
  )
}
