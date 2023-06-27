import { component$, Slot } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import { protectedRouteHelper } from '~/auth/helpers/protected-route'

export const onRequest: RequestHandler = protectedRouteHelper

export default component$(() => {
  return <Slot />
})
