import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { users } from './users.js'
import { favs } from './favs.js'

export const getFavs = (req, res) => {
  const { username } = req.currentUser
  res.status(200).json({ favs: favs[username] })
}

export const deleteFav = (req, res) => {
  const { id } = req.params
  const { username } = req.currentUser
  favs[username] = favs[username].filter((favId) => favId !== id)

  console.log({
    idRemoved: id,
    remainingFavs: favs[username],
    username
  })

  res.status(200).json({ favs: favs[username] })
}

export const postFav = (req, res) => {
  const { id } = req.params
  const { username } = req.currentUser

  const alreadyExist = favs[username].some((favId) => favId === id)
  if (!alreadyExist) {
    favs[username].push(id)
  }

  console.log({
    alreadyExist,
    favs: favs[username],
    username
  })

  res.status(201).json({ favs: favs[username] })
}

export const postLogin = async (req, res) => {
  const { username, password } = req.body

  const user = users.find((u) => u.username === username)

  if (!user) {
    return res.status(403).json({ error: 'Invalid credentials' })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.status(403).json({ error: 'Invalid credentials' })
  }

  const jwtKey = process.env.JWT_KEY

  console.log(jwtKey)
  const secret = new TextEncoder().encode(jwtKey)
  const payload = {
    iss: user.username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour
  }

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret)

  res.status(201).json({ jwt: token })
}

export const postRegister = async (req, res) => {
  const { username, password } = req.body

  const alreadyExist = users.find((user) => user.username === username)
  if (alreadyExist) {
    return res.status(409).json({ error: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = {
    username,
    password: hashedPassword
  }

  users.push(user)
  favs[username] = []
  res.status(201).json({ message: 'User created successfully' })
}
