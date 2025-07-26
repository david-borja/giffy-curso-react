import { useEffect, useRef, useState } from 'react'

export function useNearScreen({ distance = '100px' } = {}) {
  const [isNearScreen, setIsNearScreen] = useState(false)
  const elementRef = useRef() // nos permite guardar un valor entre renderizados

  useEffect(
    function () {
      let observer
      const onChange = (entries, observer) => {
        const [element] = entries
        if (element.isIntersecting) {
          setIsNearScreen(true)
          // observer.unobserve(element) // esto es más granular. nos permite dejar de observar un elemento en específico
          observer.disconnect()
        }
      }

      // polifill para navegadores que no tengan IntersectionObserver
      Promise.resolve(
        typeof IntersectionObserver !== 'undefined'
          ? IntersectionObserver
          : import('intersection-observer')
      ).then(() => {
        // error común: si lo que está arriba de lo que queremos cargar con lazy se carga de manera asíncrona, la sección aparecerá en el viewport y por tanto se visualizará como si se hubiera hecho scroll. Solución: ponerle un min-height a la sección de arriba.
        observer = new IntersectionObserver(onChange, {
          rootMargin: distance
        })
        // observer.observe(document.getElementById('LazyTrending')) // en react preferimos evitar estas queries al dom. además, lo tiene que recuperar cada vez que se ejecuta el efecto

        observer.observe(elementRef.current)
      })

      return () => observer && observer.disconnect()
    },
    [distance]
  )

  return { isNearScreen, fromRef: elementRef }
}
