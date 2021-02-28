import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import * as apiJokes from './mockjokes.json'
import ChuckNorrisApp from './ChuckNorrisApp'
import fetch from 'jest-fetch-mock'

beforeEach(() => {
  fetch.resetMocks()
})

test('initially renders 10 non-favorite jokes', async () => {
  fetch.mockResponseOnce(JSON.stringify(apiJokes))
  render(<ChuckNorrisApp />)

  expect(await screen.findAllByTestId('non-favorite')).toHaveLength(10)
})

test('the fetch button renders 10 non-favorite jokes', async () => {
  fetch.mockResponseOnce(JSON.stringify({ type: 'success', value: [] }))
  render(<ChuckNorrisApp />)

  // Get past the initial request, the jokes list should be empty.
  expect(await screen.findByText('NO DATA')).toBeInTheDocument()

  // And trigger another request.
  fetch.mockResponseOnce(JSON.stringify(apiJokes))
  fireEvent.click(screen.getByText('Fetch 10 random jokes'))

  expect(await screen.findAllByTestId('non-favorite')).toHaveLength(10)
})

test('clicking a non-favorite joke in the main list puts it in the favorites list', async () => {
  fetch.mockResponseOnce(JSON.stringify(apiJokes))
  render(<ChuckNorrisApp />)

  expect((await screen.findByTestId('jokes-list')).children).toHaveLength(10)

  fireEvent.click(screen.getByText(/^count from one to ten/i))
  fireEvent.click(screen.getByText(/^A high tide means Chuck Norris is flying/))
  fireEvent.click(screen.getByText(/^Chuck Norris can drink an entire gallon/))

  expect(await screen.findAllByTestId('non-favorite')).toHaveLength(7)
  expect((await screen.findByTestId('favorite-jokes-list')).children).toHaveLength(3)
})
