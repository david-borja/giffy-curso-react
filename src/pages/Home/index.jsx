import ListOfGifs from '@/components/ListOfGifs'
import { useGifs } from '@/hooks/useGifs'
import TrendingSearches from '@/components/TrendingSearches'
import SearchForm from '@/components/SearchForm'
import { useLocation } from 'wouter'
import { useCallback } from 'react'

export default function Home() {
  const [_path, pushLocation] = useLocation()
  const { _loading, gifs } = useGifs()

  const handleSubmit = useCallback(
    ({ keyword }) => {
      // navegar a otra ruta
      pushLocation(`/search/${keyword}`)
    },
    [pushLocation]
  )
  // para conseguir que el componente SearchForm no se vuelva a renderizar
  // no obstante, no es el caso de uso de useMemo, ya que se suele utilizar para memorizar el resultado de una función costosa (es decir, un valor). Y aquí se está guardando un componente. Es mejor usar React.memo.
  // con el useMemo, tendríamos que añadirlo en todos los lugares que queremos usar el componente. Con React.memo, solo lo hacemos una vez en el componente SearchForm y ya está.
  // const element = useMemo(() => <SearchForm onSubmit={handleSubmit} />, [])
  return (
    <>
      {/* {element} */}
      {/* la simple extracción del componente nos ha permitido bajar en el árbol su estado local 'keyword', y por tanto, evitar que se renderize todo el componente home cuando el usuario teclear */}
      <SearchForm onSubmit={handleSubmit} />
      <div className='App-main'>
        <div className='App-results'>
          <h3 className='App-title'>Última búsqueda</h3>
          <ListOfGifs gifs={gifs} />
        </div>
        <div className='App-category'>
          <TrendingSearches />
        </div>
      </div>
    </>
  )
}
