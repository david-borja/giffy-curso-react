import { act, renderHook } from '@testing-library/react'
import { expect, test } from 'vitest'
import useForm from './hook'

const setup = (params) => renderHook(() => useForm(params))

test('should use initial values', () => {
  const { result } = setup({
    initialKeyword: 'matrix'
  })
  expect(result.current.keyword).toBe('matrix')
})

test('should change keyword', () => {
  const { result } = setup()
  // act simula la forma de comportarse de react en un navegador. Sin el act, puede ser que el estado se actualice después del expect
  act(() => result.current.updateKeyword('batman'))
  expect(result.current.keyword).toBe('batman')
})

test('should update correct times when used twice', () => {
  const { result } = setup({
    initialKeyword: 'matrix'
  })
  // act simula la forma de comportarse de react en un navegador. Sin el act, puede ser que el estado se actualice después del expect
  act(() => {
    result.current.updateKeyword('bat')
    result.current.updateKeyword('batman')
  })
  expect(result.current.keyword).toBe('batman')
  expect(result.current.times).toBe(2)
})
