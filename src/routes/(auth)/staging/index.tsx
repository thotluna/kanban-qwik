import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { useUserSession } from '~/auth/hooks/use_user_session'
import { getUser } from '~/auth/services/getUser'

export default component$(() => {
  const isProtected = useSignal(false)
  const navigate = useNavigate()
  const userSession = useUserSession()

  useVisibleTask$(({ cleanup }) => {
    const timeout = setTimeout(async () => {
      const { data, error } = await getUser()

      if (data?.user?.id && !error) {
        isProtected.value = true

        userSession.userId = data.user.id
        userSession.isLoggedIn = true

        const name = data.user.email?.split('@')[0]
        navigate(`/${name}/boards`)
      } else {
        console.error(error)
        userSession.userId = undefined
        userSession.isLoggedIn = false
        navigate('/sign-in')
      }
    }, 500)

    cleanup(() => clearTimeout(timeout))
  })

  return <div>Staging</div>
})
