import { Link } from 'wouter'
import useUser from '@/hooks/useUser'
import './styles.css'

export default function Header() {
  const { isLogged, logout } = useUser()

  const handleClick = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <header className='gf-header'>
      {isLogged ? (
        // seguramente lo mejor sería que visualmente fuera un botón igual que el login, y que no fuera un enlace, porque hace una navegación innecesaria (añade el hash en la url)
        <Link to='#' onClick={handleClick}>
          Logout
        </Link>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </header>
  )
}
