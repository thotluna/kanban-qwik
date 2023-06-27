import { type Session } from '@supabase/supabase-js'
import type { UserSession } from '../contexts'

type RegisterSessionType = {
  session: Session
  controller: AbortController
  stateSession: UserSession
}

export async function registerSessionHelper({
  session,
  controller,
  stateSession,
}: RegisterSessionType) {
  const { access_token, refresh_token, user } = session
  const { id, email } = user
  const name = email?.split('@')[0]

  const body = {
    accessToken: access_token,
    refreshToken: refresh_token,
  }

  return await fetch('/auth/api/store-auth', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body),
    signal: controller.signal,
  })
    .then(() => {
      stateSession.isLoggedIn = true
      stateSession.userId = id
      stateSession.userName = name
      stateSession.flagLogged = true
      return true
    })
    .catch((error) => {
      stateSession.isLoggedIn = false
      stateSession.userId = undefined
      stateSession.userName = undefined
      stateSession.flagLogged = true
      console.error(error)
      return false
    })
}

type UnregisterSessionType = {
  controller: AbortController
  clearSession: () => void
}

export async function unregisterSessionHelper({
  controller,
  clearSession,
}: UnregisterSessionType) {
  fetch('/auth/api/store-auth', {
    method: 'GET',
    credentials: 'include',
    signal: controller.signal,
  })
    .then(() => {
      clearSession()
    })
    .catch((error) => console.error(error))
}
