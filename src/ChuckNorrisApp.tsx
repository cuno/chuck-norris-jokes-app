import { useEffect, useReducer } from 'react'
import './ChuckNorrisApp.css'
import { TEN_RANDOM_JOKES_URL } from './constants'
import { initialState, initJokes, jokeReducer } from './store'
import JokeList from './JokeList'

const localStorage = window.localStorage

const fetchHelper = (url: string, onSuccess: (json: any) => void) => {
  fetch(url)
    .then((res) => res.json())
    .then(
      (json) => {
        if (json.type === 'success') {
          onSuccess(json)
        } else {
          alert(`Server: ${json.type}`)
        }
      },
      (error) => {
        alert(error)
      }
    )
}

const ChuckNorrisApp = () => {
  const [state, dispatch] = useReducer(jokeReducer, initialState)

  // Get jokes from local storage or the API.
  useEffect(() => {
    const storedJokesString = localStorage.getItem('favoriteJokes')
    const storedJokes: Array<{ id: number; text: string }> = JSON.parse(storedJokesString ? storedJokesString : '[]')
    if (storedJokes.length > 0) {
      console.debug('Fetching jokes from local storage')
      dispatch(initJokes(storedJokes))
    } else {
      console.debug('Fetching jokes from the API')
      fetchHelper(TEN_RANDOM_JOKES_URL, (json) =>
        dispatch(initJokes(json.value.map((item: { id: number; joke: string }) => ({ id: item.id, text: item.joke }))))
      )
    }
  }, [])

  useEffect(() => {
    if (state.jokes && state.jokes.length > 0) {
      console.debug('Saving jokes to local storage', state.jokes)
      localStorage.setItem('favoriteJokes', JSON.stringify(state.jokes))
    }
  }, [state.jokes])

  return (
    <div className="App">
      <button onClick={() => localStorage.clear()}>Clear local storage</button>
      <button
        onClick={() => {
          fetchHelper(TEN_RANDOM_JOKES_URL, (json) =>
            dispatch(initJokes(json.value.map((item: { id: number; joke: string }) => ({ id: item.id, text: item.joke }))))
          )
        }}
      >
        Fetch 10 random jokes
      </button>
      <JokeList dispatch={dispatch} jokes={state.jokes} />
    </div>
  )
}

export default ChuckNorrisApp
