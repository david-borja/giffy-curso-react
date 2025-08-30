import { memo, useReducer } from 'react'
import { useLocation } from 'wouter'

const RATINGS = ['g', 'pg', 'pg-13', 'r']

const ACTIONS = {
  UPDATE_KEYWORD: 'update_keyword',
  UPDATE_RATING: 'update_rating'
}

// el concepto de las action es que sepa qué estado actualizar y cómo actualizarlo
// el dispatch nos permite actualizar el estado de una manera más declarativa, sin detallar cómo se hace esa actualización
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_KEYWORD:
      return { ...state, keyword: action.payload, times: state.times + 1 }

    case ACTIONS.UPDATE_RATING:
      return { ...state, rating: action.payload }

    default:
      return state
  }
}

function SearchForm({ initialRating = RATINGS[0], initialKeyword = '' }) {
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0
  })

  const { keyword, rating, times } = state

  const [_path, pushLocation] = useLocation()

  // para conseguir que el componente SearchForm no se vuelva a renderizar

  // no obstante, no es el caso de uso de useMemo, ya que se suele utilizar para memorizar el resultado de una función costosa (es decir, un valor). Y aquí se está guardando un componente. Es mejor usar React.memo.
  // con el useMemo, tendríamos que añadirlo en todos los lugares que queremos usar el componente. Con React.memo, solo lo hacemos una vez en el componente SearchForm y ya está.
  // const element = useMemo(() => <SearchForm onSubmit={handleSubmit} />, [])

  const handleChangeRating = (evt) => {
    dispatch({ type: ACTIONS.UPDATE_RATING, payload: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // navegar a otra ruta
    pushLocation(`/search/${keyword}/${rating}`)
  }

  const handleChange = (evt) => {
    dispatch({ type: ACTIONS.UPDATE_KEYWORD, payload: evt.target.value })
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
      <select value={rating} onChange={handleChangeRating}>
        <option disabled>Rating type</option>
        {RATINGS.map((rating) => (
          <option key={rating}>{rating}</option>
        ))}
      </select>
      <small>{times}</small>
    </form>
  )
}

// esto va a evitar que se renderize en base a sus props. React.memo es una función de orden superior que memoriza el resultado de un componente funcional. Si las props no cambian, React.memo evita que el componente se vuelva a renderizar, lo que mejora el rendimiento al evitar cálculos innecesarios y renderizados. React.memo hace una comparación superficial de las props. Por eso muchas veces se usa junto con useCallback o useMemo, para evitar que las funciones o valores se vuelvan a crear en cada renderizado y así evitar que React.memo considere que las props han cambiado. Esto es lo que hace React.memo por dentro
// export default memo(SearchForm, (prevProps, nextProps) => {
//   return areEqual(prevProps, nextProps) // areEqual es una utilidad que tiene react por dentro. Este boolean determina si el componente se tiene que volver a renderizar o no
// })
export default memo(SearchForm)
