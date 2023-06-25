import { component$, useVisibleTask$ } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { registerSessionHelper } from '~/auth/helpers/session'
import { useUserSession } from '~/auth/hooks'
import { getSession } from '~/auth/services/get-session'

export default component$(() => {
  const navigate = useNavigate()
  const { state: stateSession, clearSession, setUserId } = useUserSession()

  useVisibleTask$(async ({ cleanup }) => {
    const { data, error } = await getSession()

    const controller = new AbortController()

    if (data?.session && !error) {
      const route = await registerSessionHelper({
        session: data.session,
        controller,
        setUserId,
      })

      route
        ? navigate(`/${stateSession.userName}/board`)
        : navigate('/auth/sign-in')
    } else {
      console.error(error)
      clearSession()
      navigate('/auth/sign-in')
    }

    cleanup(() => controller.abort())
  })

  return <div>Staging</div>
})
