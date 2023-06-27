import {
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'

export type UserSession = {
  userId?: string | undefined
  userName?: string
  isLoggedIn: boolean
  flagLogged: boolean
}
export const UserSessionContext = createContextId<UserSession>(
  'user-seccion-context'
)

import { component$ } from '@builder.io/qwik'

export const UserSessionProvider = component$(() => {
  const userSession = useStore<UserSession>({
    userId: '',
    userName: undefined,
    isLoggedIn: false,
    flagLogged: false,
  })

  useContextProvider(UserSessionContext, userSession)

  return <Slot />
})
