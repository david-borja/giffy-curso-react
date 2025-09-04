import { jwtVerify } from 'jose'
import { users } from './users.js'

export const userMiddleware = async (req, res, next) => {
  let token = req.body.jwt

  if (!token) {
    token = req.headers.authorization
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7)
    }
  }

  console.log('using: ', { jwt: token })

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_KEY || '')
      const { payload } = await jwtVerify(token, secret)

      if (payload.exp < Date.now() / 1000) {
        res.clearCookie('jwt')
        return res.status(401).json({ error: 'Token expired' })
      }

      const user = users.find((u) => u.username === payload.iss)
      req.currentUser = user
      console.log('found', { user })
      next()
    } catch (error) {
      console.log('JWT verification failed:', error.message)
      res.clearCookie('jwt')
      req.currentUser = null
      next()
    }
  } else {
    req.currentUser = null
    next()
  }
}
