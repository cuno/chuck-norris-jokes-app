import { useEffect, useReducer } from 'react'
import './ChuckNorrisApp.css'
import { TEN_RANDOM_JOKES_URL } from './constants'
import { addJokes, initialState, jokeReducer, setFavoriteAction } from './store'

const ChuckNorrisApp = () => {
  const [state, dispatch] = useReducer(jokeReducer, initialState)

  useEffect(() => {
    fetch(TEN_RANDOM_JOKES_URL)
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.type === 'success') {
            dispatch(addJokes(json.value.map((item: { id: number; joke: string }) => ({ id: item.id, text: item.joke }))))
          } else {
            alert(`Server: ${json.type}`)
          }
        },
        (error) => {
          alert(error)
        }
      )
  }, [])

  console.debug('state', state.jokes)

  return (
    <div className="App">
      <h1>Chuck Norris Jokes</h1>
      <ul>
        {state.jokes
          .filter((joke) => !joke.favorite)
          .map((joke) => (
            <li
              key={joke.id}
              className="joke"
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
