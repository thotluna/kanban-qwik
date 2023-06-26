import type { RequestEvent } from '@builder.io/qwik-city'
import { COOKIES_ACCESS_TITLE } from '../constants'
import { getProfileFromServer } from '../services'

export const protectedRoute = async ({
  cookie,
  next,
  redirect,
  env,
  params,
}: RequestEvent<QwikCityPlatform>) => {
  const token = cookie.get(COOKIES_ACCESS_TITLE)?.value

  const privateKey = env.get('PRIVATE_SUPABASE_KEY')

  if (!token || !privateKey) {
    redirect(303, '/auth/sign-in')
    return
  }

  console.log('Hay Tokens')

  const profile = await getProfileFromServer({ privateKey, token })

  if (!profile || !profile.id || !profile.email || !profile.role) {
    redirect(303, '/auth/sign-in')
    return
  }

  const name = profile.email.split('@')[0]
  console.log({ name, params: params.user })

  if (params.user !== name) {
    redirect(303, '/auth/sign-in')
    return
  }

  if (profile.role === 'free') {
    await next()
  } else {
    redirect(303, '/auth/sign-in')
  }
}
