import { Context } from 'https://deno.land/x/oak@v12.6.1/mod.ts'
import { verify } from 'https://deno.land/x/djwt@v3.0.2/mod.ts'
import { users, User } from './users.ts'

const userMiddleware = async (ctx: Context, next: Function) => {
  // Get JWT from request if available
  const { value = {} } = await ctx.request.body()
  let { jwt } = value

  if (!jwt) {
    jwt = ctx.request.headers.get('Authorization')
  }

  console.log('using: ', { jwt })

  if (jwt) {
    // Validate JWT and if it is invalid delete from cookie
    const data: any = await verify(jwt, Deno.env.get('JWT_KEY') || '')

    if (!data.isValid || data.isExpired) {
      ctx.cookies.delete('jwt')
      ctx.response.status = 401
    } else if (data) {
      // If it is valid select user and save in context state
      const user: any = users.find((u: User) => u.username === data.payload.iss)
      ctx.state.currentUser = user
      console.log('found', { user })
      await next()
    } else {
      ctx.cookies.delete('jwt')
      await next()
    }
  } else {
    ctx.state.currentUser = null
    await next()
  }
}

export { userMiddleware }
