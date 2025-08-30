import { useCallback, useReducer } from 'react'

const ACTIONS = {
  UPDATE_KEYWORD: 'update_keyword',
  UPDATE_RATING: 'update_rating'
}

const ACTION_REDUCERS = {
  [ACTIONS.UPDATE_KEYWORD]: (state, action) => ({
    ...state,
    keyword: action.payload,
    times: state.times + 1
  }),
  [ACTIONS.UPDATE_RATING]: (state, action) => ({
    ...state,
    rating: action.payload
  })
}

const reducer = (state, action) => {
  const actionReducer = ACTION_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}

export default function useForm({ initialKeyword, initialRating } = {}) {
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0
  })

  const { keyword, rating, times } = state
  const updateRating = useCallback(
    (rating) =>
      dispatch({
        type: ACTIONS.UPDATE_RATING,
        payload: rating
      }),
    []
  )

  const updateKeyword = useCallback(
    (keyword) =>
      dispatch({
        type: ACTIONS.UPDATE_KEYWORD,
        payload: keyword
      }),
    []
  )

  return {
    keyword,
    rating,
    times,
    updateRating,
    updateKeyword
  }
}
