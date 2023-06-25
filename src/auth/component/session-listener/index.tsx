import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik'
import { useUserSession } from '~/auth/hooks'
import { getUser } from '~/auth/services'
import { onAuthStateChange } from '~/auth/services/onAuthStateChange'

export const SessionListener = component$(() => {
  const { clearSession, setUserId } = useUserSession()

  useVisibleTask$(async () => {
    const { data } = await getUser()
    if (data?.user?.id) {
      setUserId(data.user.id)
    } else {
      clearSession()
    }
  })

  useVisibleTask$(({ cleanup }) => {
    const { authListener } = onAuthStateChange({
      callback: (event, session) => {
        console.log({ event })
        if (
          event === 'SIGNED_IN' &&
          session?.access_token &&
          session?.refresh_token
        ) {
          const body = {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
          }
          fetch('/auth/api/store-auth', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body),
          })
            .then(() => {
              setUserId(session.user.id)
            })
            .catch((error) => console.error(error))
        }

        if (event === 'SIGNED_OUT') {
          fetch('/auth/api/store-auth')
            .then((res) => {
              console.log(res)
              clearSession()
            })
            .catch((error) => console.error(error))
        }
      },
    })
    cleanup(() => {
      authListener?.subscription?.unsubscribe()
    })
  })

  return <Slot />
})
