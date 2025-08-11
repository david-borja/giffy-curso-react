import { useEffect, useRef } from 'react'

// Si realmente es importante el seo, hay que hacer SSR
export function useSEO({ description, title }) {
  const prevTitle = useRef(document.title)
  const prevDescription = useRef(
    document.querySelector('meta[name="description"]').getAttribute('content')
  )

  useEffect(() => {
    const previousTitle = prevTitle.current
    if (title) {
      document.title = `${title} | Giffy`
    }

    // las cleanup function no solamente se ejecutan al desmontar el componente, si no también antes de volver a ejecutar el efecto
    return () => (document.title = previousTitle)
  }, [title])

  useEffect(() => {
    const previousDescription = prevDescription.current
    const metaDescription = document.querySelector('meta[name="description"]')
    if (description) {
      metaDescription.setAttribute('content', description)
    }

    return () => metaDescription.setAttribute('content', previousDescription)
  }, [description])
}
