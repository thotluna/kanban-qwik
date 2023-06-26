import type { RequestEvent } from '@builder.io/qwik-city'
import { COOKIES_ACCESS_TITLE } from '../constants'
import { getUserFromServer } from '../services'

export const protectedRoute = async ({
  cookie,
  next,
  redirect,
  env,
}: RequestEvent<QwikCityPlatform>) => {
  const token = cookie.get(COOKIES_ACCESS_TITLE)?.value

  if (!token) {
    redirect(303, '/auth/sign-in')
    return
  }

  const privateKey = env.get('PRIVATE_SUPABASE_KEY')

  const user = await getUserFromServer({ privateKey, jwt: token })

  if (user?.data?.user?.role !== 'free') {
    await next()
  } else {
    redirect(303, '/auth/sign-in')
  }
}
