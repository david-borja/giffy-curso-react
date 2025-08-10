import { Redirect } from 'wouter'
import Gif from '@/components/Gif'
import Spinner from '@/components/Spinner'
import useSingleGif from '@/hooks/useSingleGif'

export default function Detail({ params }) {
  const { gif, isLoading, isError } = useSingleGif({ id: params.id })

  if (isLoading) return <Spinner />
  if (isError) return <Redirect to='/404' />
  if (!gif) return null

  return (
    <>
      <h3 className='App-title'>{gif.title}</h3>
      <Gif {...gif} />
    </>
  )
}
