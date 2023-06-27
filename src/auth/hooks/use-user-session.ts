import { $, useContext } from '@builder.io/qwik'
import { UserSessionContext } from '../contexts'

export function useUserSession() {
  const state = useContext(UserSessionContext)

  if (!state) {
    throw new Error('Please validate your provider context for User Session')
  }

  const setUserId = $((id: string, name: string | undefined = undefined) => {
    state.userId = id
    state.userName = name
    state.isLoggedIn = true
    state.flagLogged = true
  })

  const clearSession = $(() => {
    state.userId = undefined
    state.userName = undefined
    state.isLoggedIn = false
    state.flagLogged = false
  })

  return { state, setUserId, clearSession }
}
