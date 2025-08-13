import { Redirect } from 'wouter'
import { Head } from '@unhead/react'
import Gif from '@/components/Gif'
import Spinner from '@/components/Spinner'
import useSingleGif from '@/hooks/useSingleGif'

export default function Detail({ params }) {
  const { gif, isLoading, isError } = useSingleGif({ id: params.id })
  const title = gif ? gif.title : ''

  if (isLoading)
    return (
      <>
        <Head>
          <title>Cargando...</title>
        </Head>
        <Spinner />
      </>
    )
  if (isError) return <Redirect to='/404' />
  if (!gif) return null

  return (
    <>
      <Head>
        <title>{title} || Giffy</title>
        <meta name='description' content={title}></meta>
      </Head>
      <h3 className='App-title'>{gif.title}</h3>
      <Gif {...gif} />
    </>
  )
}
