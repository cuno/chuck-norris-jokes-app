import { Joke } from './store'

export const isFullList = (jokes: Joke[]) => jokes && jokes.length >= 10
export const apiToAppJoke = (item: { id: number; joke: string }) => ({ id: item.id, text: item.joke })
export const fetchHelper = (url: string, onSuccess: (json: any) => void) => {
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
