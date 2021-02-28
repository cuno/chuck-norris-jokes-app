import { useEffect, useReducer } from 'react'
import './ChuckNorrisApp.css'
import { RANDOM_JOKE_URL, TEN_RANDOM_JOKES_URL } from './constants'
import { addJokes, initialState, initJokes, Joke, jokeReducer } from './store'
import JokeList from './JokeList'
import { take } from 'rxjs/operators'
import { interval } from 'rxjs'

const localStorage = window.localStorage

const isFullList = (jokes: Joke[]) => jokes && jokes.length >= 10
const ticker$ = interval(5000).pipe(take(10))
const fetchHelper = (url: string, onSuccess: (json: any) => void) => {
  fetch(url)
    .then((res) => res.json())
    .then(
      (json) => {
        if (json.type === 'success') {
          console.debug('JSON response', json)
          onSuccess(json)
        } else {
          console.error(`Server: ${json.type}`)
        }
      },
      (error) => {
        console.error(error)
      }
    )
}

export const apiToAppJoke = (item: { id: number; joke: string }) => ({ id: item.id, text: item.joke })

const ChuckNorrisApp = ({ disableLocalStorage = true }) => {
  const [state, dispatch] = useReducer(jokeReducer, initialState)

  // Dispatch on interval.
  const addOnInterval = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    ticker$.subscribe((n) => fetchHelper(RANDOM_JOKE_URL, (json) => dispatch(addJokes(json.value && json.value.map(apiToAppJoke)))))

  // Get jokes from local storage or the API.
  useEffect(() => {
    const storedJokesString = localStorage.getItem('favoriteJokes')
    const storedJokes: Array<{ id: number; text: string }> = JSON.parse(storedJokesString ? storedJokesString : '[]')
    if (!disableLocalStorage && storedJokes.length > 0) {
      console.debug('Fetching jokes from local storage')
      dispatch(initJokes(storedJokes))
    } else {
      console.debug('Fetching jokes from the API')
      fetchHelper(TEN_RANDOM_JOKES_URL, (json) => dispatch(initJokes(json.value && json.value.map(apiToAppJoke))))
    }
  }, [disableLocalStorage])

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
          fetchHelper(TEN_RANDOM_JOKES_URL, (json) => dispatch(initJokes(json.value && json.value.map(apiToAppJoke))))
        }}
      >
        Fetch 10 random jokes
      </button>
      <button disabled={isFullList(state.jokes)} onClick={addOnInterval}>
        Add 10 jokes on interval
      </button>
      <button onClick={(json) => dispatch(initJokes([].map(apiToAppJoke)))}>Clear</button>

      <JokeList dispatch={dispatch} jokes={state.jokes} />
    </div>
  )
}

export default ChuckNorrisApp
