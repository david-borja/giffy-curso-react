import { memo, useState } from 'react'

function SearchForm({ onSubmit }) {
  console.count('SearchForm component')
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // navegar a otra ruta
    onSubmit({ keyword })
  }

  const handleChange = (evt) => {
    setKeyword(evt.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <button>Buscar</button>
      <input
        placeholder='Search a gif here...'
        onChange={handleChange}
        type='text'
        value={keyword}
      />
    </form>
  )
}

// esto va a evitar que se renderize en base a sus props. React.memo es una función de orden superior que memoriza el resultado de un componente funcional. Si las props no cambian, React.memo evita que el componente se vuelva a renderizar, lo que mejora el rendimiento al evitar cálculos innecesarios y renderizados. React.memo hace una comparación superficial de las props. Por eso muchas veces se usa junto con useCallback o useMemo, para evitar que las funciones o valores se vuelvan a crear en cada renderizado y así evitar que React.memo considere que las props han cambiado. Esto es lo que hace React.memo por dentro
// export default memo(SearchForm, (prevProps, nextProps) => {
//   return areEqual(prevProps, nextProps) // areEqual es una utilidad que tiene react por dentro. Este boolean determina si el componente se tiene que volver a renderizar o no
// })
export default memo(SearchForm)
