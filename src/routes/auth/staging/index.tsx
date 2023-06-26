import { component$, useVisibleTask$ } from '@builder.io/qwik'
import { Link, useNavigate } from '@builder.io/qwik-city'
import { useUserSession } from '~/auth/hooks'

export default component$(() => {
  const { state } = useUserSession()
  const navigation = useNavigate()

  useVisibleTask$(({ track }) => {
    track(() => state.isLoggedIn)

    if (state.isLoggedIn) {
      navigation(`/${state.userName}/boards`)
    } else {
      navigation(`/auth/sign-in`)
    }
  })

  return <Link href='/'>Home</Link>
})
