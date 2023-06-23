import { $, component$ } from '@builder.io/qwik'
import { Link, useLocation } from '@builder.io/qwik-city'
import { AuthCard } from '~/auth/component/auth-card'
import { FormEmail } from '~/auth/component/form-email'
import { GroupButtonRow } from '~/auth/component/group-button-row'
import { Header } from '~/auth/component/header'
import { AUTH_ACTIONS } from '~/auth/constants'
import { useAuthLoading } from '~/auth/hooks/use_auth_loading'
import { signInOpt } from '~/auth/services/sign_in_opt'
import { MESSAGE_TYPE } from '~/message/component/message'
import { useMessageContext } from '~/message/hooks'

export default component$(() => {
  const { setMessage } = useMessageContext()
  const { isLoading, actions } = useAuthLoading()

  const location = useLocation()

  const handlerSubmit = $(async (event: any) => {
    if (isLoading.value) return
    isLoading.value = true
    actions.value = AUTH_ACTIONS.EMAIL

    const email: string = (event.target as HTMLFormElement).email.value

    if (!email) {
      isLoading.value = false
      actions.value = undefined
      setMessage({
        message: 'Please check the terms and fill the email',
        type: MESSAGE_TYPE.ERROR,
      })
      return
    }

    const url = `${location.url.origin}/staging`
    const { data, error } = await signInOpt({ email, redirect: url })

    if (data && !error) {
      setMessage({
        message: 'Perfecto! Ahora chequea tu email para entrar a tu cuenta',
        type: MESSAGE_TYPE.SUCCESS,
      })
    } else {
      setMessage({
        message:
          'Uff! Hemos tenido un problema al registrarte. Inténtalo más tarde ' +
          error?.message,
        type: MESSAGE_TYPE.ERROR,
      })
    }

    isLoading.value = false
    actions.value = undefined
  })

  const googleHandler = $(() => {
    isLoading.value = true
    actions.value = AUTH_ACTIONS.GOOGLE
  })

  const githubHandler = $(() => {
    isLoading.value = true
    actions.value = AUTH_ACTIONS.GITHUB
  })

  return (
    <section class='w-full h-full flex justify-center items-center'>
      <AuthCard>
        <Link href='/'>Atras</Link>
        <Header
          title='Sign In'
          messageLink='sign up with new user'
          href='/sign-up'
        />
        <GroupButtonRow
          githubHandler={githubHandler}
          googleHandler={googleHandler}
          isLoading={isLoading.value}
          action={actions.value}
        />
        <FormEmail
          submitTitle='Sign In'
          handlerSubmit={handlerSubmit}
          isLoading={isLoading.value}
          action={actions.value}
        />
      </AuthCard>
    </section>
  )
})
