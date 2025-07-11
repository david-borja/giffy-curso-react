const apiKey = import.meta.env.VITE_GIPHY_API_KEY

export default function getGifs({ keyword = 'morty' } = {}) {
  const SEARCH_URL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=10&offset=0&rating=g&lang=en`

  return fetch(SEARCH_URL)
    .then((res) => res.json())
    .then(({ data }) => {
      if (Array.isArray(data)) {
        const gifs = data.map((image) => image.images.downsized_medium.url)
        return gifs
      }
    })
}
