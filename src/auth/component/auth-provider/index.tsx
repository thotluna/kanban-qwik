import {
  $,
  component$,
  Slot,
  useOnWindow,
  useVisibleTask$,
} from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { registerSessionHelper, unregisterSessionHelper } from '~/auth/helpers'
import { useUserSession } from '~/auth/hooks'
import { Auth } from '~/auth/services'
import { MESSAGE_TYPE, useMessageContext } from '~/message'

export const AuthProvider = component$(() => {
  const { setMessage } = useMessageContext()
  const { state: stateSession, clearSession, setUserId } = useUserSession()
  const navigate = useNavigate()

  useOnWindow(
    'load',
    $(() => {
      const controller = new AbortController()
      Auth().onAuthStateChange({
        callback: async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            const saveSession = await registerSessionHelper({
              session,
              controller,
              stateSession,
            })

            if (saveSession) {
              setMessage({
                message: 'You are logged in',
                type: MESSAGE_TYPE.SUCCESS,
              })
              navigate(`/${stateSession.userName}/boards`)
            } else {
              setMessage({
                message: 'Do you not permisses',
                type: MESSAGE_TYPE.ERROR,
              })

              navigate(`/auth/sign-in`)
            }
          }

          if (event === 'SIGNED_OUT') {
            await unregisterSessionHelper({ controller, clearSession })
            setMessage({
              message: 'Good bye',
              type: MESSAGE_TYPE.SUCCESS,
            })
          }
        },
      })
    })
  )

  useVisibleTask$(async ({ track }) => {
    track(() => stateSession.isLoggedIn)
    if (stateSession.isLoggedIn) {
      const { data } = await Auth().getUser()
      if (data?.user) {
        const { id, email } = data.user
        const name = email?.split('@')[0]
        setUserId(id, name)
      } else {
        clearSession()
      }
    }
  })

  return <Slot />
})
