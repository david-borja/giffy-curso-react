import { useCallback, useEffect, useRef } from 'react'
import { Head } from '@unhead/react'
import Spinner from '@/components/Spinner'
import ListOfGifs from '@/components/ListOfGifs'
import { useGifs } from '@/hooks/useGifs'
import { useNearScreen } from '@/hooks/useNearScreen'
import { debounce } from '@/utils/debounce'

// OJO: si los componentes se usan más de una vez, no es buena práctica definir variables fuera del componente. Sobre todo funciones.

export default function SearchResults({ params }) {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })
  const externalRef = useRef()
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false
  })

  const title = gifs ? `${gifs.length} resultados de ${keyword}` : ''

  // el problema es que esta función se crea en cada render, entonces si la pasamos directamente a debounce, se creará una nueva función cada vez que se renderice el componente, lo cual no es lo que queremos. Se puede solucionar con useRef, pero taambién con useCallback
  // useCallback es una mezcla entre useRef y useEffect. Persiste entre renderizados y a demás tiene un array de dependencias
  // necesitamos exactamente la misma función para saber cuantas veces ha llamado esa función y evitar hacer la llamada innecesariamente
  // useMemo es como useCallback pero para valores

  const DELAY = 200
  const debounceHandleNextPage = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), DELAY),
    [setPage]
  )

  useEffect(
    function () {
      if (isNearScreen) debounceHandleNextPage()
    },
    [isNearScreen, debounceHandleNextPage]
  )

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Head>
            <title>{title}</title>
            <meta name='description' content={title}></meta>
          </Head>
          <h3 className='App-title'>{decodeURI(keyword)}</h3>
          <ListOfGifs gifs={gifs} />
          <div id='visor' ref={externalRef}></div>
        </>
      )}
    </>
  )
}
