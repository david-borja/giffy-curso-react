import express from 'express'
import cors from 'cors'
import { userMiddleware } from './userMiddleware.js'
import { authMiddleware } from './authMiddleware.js'
import {
  getFavs,
  deleteFav,
  postFav,
  postLogin,
  postRegister
} from './controllers.js'

const DEFAULT_PORT = 8080
const port = process.env.PORT || DEFAULT_PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(userMiddleware)

app.get('/favs', authMiddleware, getFavs)
app.delete('/favs/:id', authMiddleware, deleteFav)
app.post('/favs/:id', authMiddleware, postFav)
app.post('/login', postLogin)
app.post('/register', postRegister)

app.use((err, req, res) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`Started listening on port: ${port}`)
})
