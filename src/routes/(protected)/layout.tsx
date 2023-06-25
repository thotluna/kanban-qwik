import { component$, Slot } from '@builder.io/qwik'
import { type RequestHandler } from '@builder.io/qwik-city'
import { getUserFromServer } from '~/auth/services'

export const onRequest: RequestHandler = async ({
  env,
  cookie,
  headers,
  redirect,
  next,
}) => {
  const privateKey = env.get('PRIVATE_SUPABASE_KEY')

  if (!privateKey) {
    console.error('Error in private key')
    redirect(301, '/auth/sign-in')
  }

  console.log({ headers })
  const jwt =
    cookie.get('sb-access-token')?.value ??
    cookie.get('server-access-token')?.value

  if (!jwt) {
    console.error('Error in jwt')
    redirect(301, '/auth/sign-in')
  }

  const { data } = await getUserFromServer({ privateKey, jwt })

  console.log('server', data)

  await next()
}

export default component$(() => {
  return <Slot />
})
