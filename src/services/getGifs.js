import { API_KEY, API_URL } from './settings'

const fromApiResponseToGifs = (apiResponse) => {
  const { data = [] } = apiResponse
  if (Array.isArray(data)) {
    const gifs = data.map((image) => {
      const { images, title, id } = image
      const { url } = images.downsized_medium
      return { title, id, url }
    })
    return gifs
  }
  return []
}

export default function getGifs({
  limit = 25,
  keyword = 'morty',
  page = 0
} = {}) {
  const offset = page * limit
  const apiURL = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${offset}&rating=G&lang=en`

  return fetch(apiURL)
    .then((res) => res.json())
    .then(fromApiResponseToGifs)
}
