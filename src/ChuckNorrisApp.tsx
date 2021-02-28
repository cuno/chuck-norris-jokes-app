import { useEffect, useReducer } from 'react'
import './ChuckNorrisApp.css'
import { TEN_RANDOM_JOKES_URL } from './constants'
import { addJokes, initialState, initJokes, jokeReducer, setFavoriteAction } from './store'

const localStorage = window.localStorage

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
      fetch(TEN_RANDOM_JOKES_URL)
        .then((res) => res.json())
        .then(
          (json) => {
            if (json.type === 'success') {
              dispatch(initJokes(json.value.map((item: { id: number; joke: string }) => ({ id: item.id, text: item.joke }))))
            } else {
              alert(`Server: ${json.type}`)
            }
          },
          (error) => {
            alert(error)
          }
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
      <h1>Chuck Norris Jokes</h1>
      <ul>
        {state.jokes.map((joke) => (
          <li
            key={joke.id}
            className={`joke${joke.favorite ? ' favorite' : ''}`}
            dangerouslySetInnerHTML={{ __html: joke.text }}
            onClick={() => dispatch(setFavoriteAction(joke.id, true))}
          />
        ))}
      </ul>

      <h2>Favorites</h2>
      <ul>
        {state.jokes
          .filter((joke) => joke.favorite)
          .map((joke) => (
            <li
              key={joke.id}
              className="joke favorite"
              dangerouslySetInnerHTML={{ __html: joke.text }}
              onClick={() => dispatch(setFavoriteAction(joke.id, false))}
            />
          ))}
      </ul>
    </div>
  )
}

export default ChuckNorrisApp
