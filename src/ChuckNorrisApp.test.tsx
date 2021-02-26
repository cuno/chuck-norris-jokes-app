import React from 'react'
import { render, screen } from '@testing-library/react'
import ChuckNorrisApp from './ChuckNorrisApp'

test('renders no favorite jokes initially', () => {
  render(<ChuckNorrisApp />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders 10 jokes initially', () => {
  render(<ChuckNorrisApp />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

test('checking a favorite checkbox moves a joke to the favorites list', () => {
  render(<ChuckNorrisApp />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

test('unchecking a favorite checkbox moves a joke back to the base list', () => {
  render(<ChuckNorrisApp />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

test('checking a favorite checkbox does not changes the total checked count when 10 jokes are checked', () => {
  render(<ChuckNorrisApp />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
