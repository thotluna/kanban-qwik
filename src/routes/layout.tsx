import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { useUserSession } from '~/auth/hooks/use_user_session'
import { Message } from '~/message/component/message'
import { supabase } from '~/shared/services/supabase'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  })
}

export default component$(() => {
  const userSession = useUserSession()

  useVisibleTask$(async ({ cleanup }) => {
    const { data: authListener } = await supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log({ event })

        if (event === 'SIGNED_IN') {
          //send cookies to server
          userSession.userId = session?.user.id
          userSession.isLoggedIn = true
        }

        if (event === 'SIGNED_OUT') {
          //send cookies to server

          userSession.userId = undefined
          userSession.isLoggedIn = false
        }
      }
    )
    cleanup(() => {
      authListener?.subscription?.unsubscribe()
    })
  })

  return (
    <>
      <Slot />
      <Message />
    </>
  )
})
