import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik'
import {
  registerSessionHelper,
  unregisterSessionHelper,
} from '~/auth/helpers/session'
import { useUserSession } from '~/auth/hooks'
import { getUser } from '~/auth/services'
import { onAuthStateChange } from '~/auth/services/onAuthStateChange'

export const SessionListener = component$(() => {
  const { clearSession, setUserId } = useUserSession()

  useVisibleTask$(async () => {
    const { data } = await getUser()
    if (data?.user) {
      const { id, email } = data.user
      const name = email?.split('@')[0]
      setUserId(id, name)
    } else {
      clearSession()
    }
  })

  useVisibleTask$(({ cleanup }) => {
    const controller = new AbortController()
    const { authListener } = onAuthStateChange({
      callback: (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          registerSessionHelper({ session, controller, setUserId })
        }

        if (event === 'SIGNED_OUT') {
          unregisterSessionHelper({ controller, clearSession })
        }
      },
    })
    cleanup(() => {
      controller.abort()
      authListener?.subscription?.unsubscribe()
    })
  })

  return <Slot />
})
