import { component$, Slot } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import { protectedRoute } from '~/auth/helpers/protected-route'

export const onRequest: RequestHandler = protectedRoute

export default component$(() => {
  return <Slot />
})
