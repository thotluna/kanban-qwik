import { type Session } from '@supabase/supabase-js'

type RegisterSessionType = {
  session: Session
  controller: AbortController
  setUserId: (id: string, name?: string) => void
}

export async function registerSessionHelper({
  session,
  controller,
  setUserId,
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
      setUserId(id, name)
      return true
    })
    .catch((error) => {
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
    signal: controller.signal,
  })
    .then((res) => {
      console.log(res)
      clearSession()
    })
    .catch((error) => console.error(error))
}
