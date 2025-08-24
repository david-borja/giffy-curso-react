import { Head } from '@unhead/react'
import ListOfGifs from '@/components/ListOfGifs'
import { useGifs } from '@/hooks/useGifs'
import TrendingSearches from '@/components/TrendingSearches'
import SearchForm from '@/components/SearchForm'

export default function Home() {
  const { _loading, gifs } = useGifs()

  return (
    <>
      {/* {element} */}
      {/* la simple extracción del componente nos ha permitido bajar en el árbol su estado local 'keyword', y por tanto, evitar que se renderize todo el componente home cuando el usuario teclear */}
      <Head>
        <title>Home | Giffy</title>
        <meta name='description' content='Gif searcher' />
        {/* si tenemos varios dominios para un mismo proyecto, poner aquí la canónical, para que google sepa que nos referimos a la misma web. Por ejemplo: */}
        {/* <link rel='canonical' href='https://giffy.com/' /> */}
      </Head>
      <SearchForm />
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
