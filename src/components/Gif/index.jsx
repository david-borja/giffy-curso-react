import { Link } from 'wouter'
import './styles.css'

export default function Gif({ title, id, url }) {
  return (
    <div className='Gif'>
      <Link to={`/gif/${id}`} className='Gif-link'>
        <h4>{title}</h4>
        <img loading='lazy' alt={title} src={url} />
      </Link>
    </div>
  )
}
