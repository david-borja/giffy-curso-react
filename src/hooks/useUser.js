import { useCallback, useContext, useState } from 'react'
import Context from '@/context/UserContext'
import loginService from '@/services/login'

export default function useUser() {
  const { jwt, setJwt } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const login = useCallback(
    ({ username, password }) => {
      setState({ loading: true, error: false })
      loginService({ username, password })
        .then((jwt) => {
          window.sessionStorage.setItem('jwt', jwt)
          setState({ loading: false, error: false })
          setJwt(jwt)
        })
        .catch((err) => {
          window.sessionStorage.removeItem('jwt')
          setState({ loading: false, error: true })
          console.error(err)
        })
    },
    [setJwt]
  )

  const logout = useCallback(() => {
    window.sessionStorage.removeItem('jwt')
    setJwt(null)
  }, [setJwt])

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout
  }
}
