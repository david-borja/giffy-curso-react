const ENDPOINT = 'http://localhost:8080'

export default function getFavs({ jwt }) {
  console.log('getFavs front', jwt)
  return fetch(`${ENDPOINT}/favs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    })
    .then((data) => {
      const { favs } = data
      return favs
    })
}
