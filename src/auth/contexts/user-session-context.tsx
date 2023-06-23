import {
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'

export type UserSession = {
  userId?: string | undefined
  isLoggedIn: boolean
}
export const UserSessionContext = createContextId<UserSession>(
  'user-seccion-context'
)

import { component$ } from '@builder.io/qwik'

export const UserSessionProvider = component$(() => {
  const userSession = useStore<UserSession>({
    userId: '',
    isLoggedIn: false,
  })

  useContextProvider(UserSessionContext, userSession)

  return <Slot />
})
