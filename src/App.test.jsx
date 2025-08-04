import { it, describe, beforeAll, vi, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MOCK_RESPONSE } from './test.data'
import App from './App'

beforeAll(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_RESPONSE)
    })
  )
})

// afterEach(() => {
//   vi.resetAllMocks()
// })

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

  it.todo('Should allow search form to be usable', async () => {})
})
