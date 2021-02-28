import { FunctionComponent } from 'react'
import { Action, Joke, setFavoriteAction } from './store'

const favoriteStyle = (joke: Joke) => `joke${joke.favorite ? ' favorite' : ''}`

type JokeListProps = {
  dispatch: React.Dispatch<Action>
  jokes: Joke[]
}

const JokeList: FunctionComponent<JokeListProps> = ({ dispatch, jokes }) =>
  jokes && jokes.length > 0 ? (
    <>
      <h1>Chuck Norris Jokes</h1>
      <ul data-testid="jokes-list">
        {jokes.map((joke) => (
          <li
            key={joke.id}
            className={favoriteStyle(joke)}
            data-testid={joke.favorite ? 'favorite' : 'non-favorite '}
            dangerouslySetInnerHTML={{ __html: joke.text }}
            onClick={() => dispatch(setFavoriteAction(joke.id, true))}
          />
        ))}
      </ul>

      <h2>Favorites</h2>
      <ul data-testid="favorite-jokes-list">
        {jokes
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
    </>
  ) : (
    <pre>NO DATA</pre>
  )

export default JokeList
