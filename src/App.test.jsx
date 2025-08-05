import { it, describe, beforeAll, vi, expect, afterEach } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup // Creo que esto en jest no hace falta, pero en vitest sí
} from '@testing-library/react'
import { MOCK_RESPONSE } from './test.data'
import App from './App'

beforeAll(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_RESPONSE)
    })
  )
})

afterEach(() => {
  // vi.resetAllMocks()
  cleanup()
})

describe('Giffy', () => {
  it('Should render App', async () => {
    render(<App />)
    // estos métodos como findByText también se pueden sacar de lo que devuelve render
    const text = await screen.findByText(/última búsqueda/i)
    expect(text).toBeInTheDocument()
  })

  it('Should display gif', async () => {
    const { container } = render(<App />)
    await waitFor(() => {
      const gif = container.querySelector('.Gif-link')
      expect(gif).toBeVisible()
    })
  })

  it('Should allow search form to be usable', async () => {
    render(<App />)
    const input = await screen.findByRole('textbox')
    fireEvent.change(input, { target: { value: 'Matrix' } })

    const button = await screen.findByRole('button', { name: /buscar/i })
    fireEvent.click(button)

    const text = await screen.findByText(/matrix/i)
    expect(text).toBeVisible()
  })
})
