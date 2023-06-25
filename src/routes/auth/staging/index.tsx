import { component$, useVisibleTask$ } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { useUserSession } from '~/auth/hooks'
import { getUser } from '~/auth/services/getUser'

export default component$(() => {
  const navigate = useNavigate()
  const { clearSession, setUserId } = useUserSession()

  useVisibleTask$(({ cleanup }) => {
    const timeout = setTimeout(async () => {
      const { data, error } = await getUser()

      if (data?.user?.id && !error) {
        const name = data.user.email?.split('@')[0]
        setUserId(data.user.id, name)

        navigate(`/${name}/boards`)
      } else {
        console.error(error)
        clearSession()
        navigate('/auth/sign-in')
      }
    }, 500)

    cleanup(() => clearTimeout(timeout))
  })

  return <div>Staging</div>
})
