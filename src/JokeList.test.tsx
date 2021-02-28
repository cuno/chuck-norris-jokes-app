import React from 'react'
import { render, screen } from '@testing-library/react'
import JokeList from './JokeList'

test('renders favorite and non-favorite jokes correctly', () => {
  const jokes = [
    {
      id: 419,
      text: "Count from one to ten. That's how long it would take Chuck Norris to kill you...Forty seven times.",
      favorite: false
    },
    { id: 468, text: "Chuck Norris's beard can type 140 wpm." },
    { id: 105, text: 'Chuck Norris can drink an entire gallon of milk in thirty-seven seconds.', favorite: true }
  ]

  render(<JokeList dispatch={() => {}} jokes={jokes} />)
  const nonfavoriteListElements = screen.getAllByTestId('non-favorite')
  const favoriteListElements = screen.getAllByTestId('favorite')

  expect(nonfavoriteListElements.length).toBe(2)
  expect(favoriteListElements.length).toBe(1)
})
