// Types and initial state.

export type Joke = {
  id: number
  text: string
  favorite?: boolean
}

type State = {
  jokes: Array<Joke>
}

enum ActionKind {
  AddJokes = 'ADD_JOKES',
  InitJokes = 'INIT_JOKES',
  FavoriteJoke = 'FAV_JOKE'
}

export type Action =
  | {
      type: ActionKind
      payload: Array<Joke>
    }
  | { type: ActionKind; payload: { id: number; flag: boolean } }

const initialState: State = {
  jokes: []
}

// Action creators.

const addOrInitJokes = (initial: boolean) => (newJokes: Array<Joke>) => ({
  type: initial ? ActionKind.InitJokes : ActionKind.AddJokes,
  payload: newJokes
})

const addJokes = addOrInitJokes(false)

const initJokes = addOrInitJokes(true)

const setFavoriteAction = (id: number, flag: boolean) => ({
  type: ActionKind.FavoriteJoke,
  payload: { id, flag }
})

// Reducer
// TODO: how to avoid the casting?

const jokeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.InitJokes: {
      const newJokes = action.payload as Joke[]
      return {
        ...state,
        jokes: newJokes
      }
    }
    case ActionKind.AddJokes: {
      const newJokes = action.payload as Joke[]
      return {
        ...state,
        jokes: [...state.jokes, ...newJokes]
      }
    }
    case ActionKind.FavoriteJoke: {
      const { id, flag } = action.payload as { id: number; flag: boolean }
      return {
        ...state,
        jokes: state.jokes.map((joke) => (joke.id === id ? { ...joke, favorite: flag } : joke))
      }
    }
    default:
      return state
  }
}

export { initJokes, addJokes, setFavoriteAction, jokeReducer, initialState }
