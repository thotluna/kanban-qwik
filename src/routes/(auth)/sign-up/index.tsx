import { $, component$ } from '@builder.io/qwik'

import { AuthCard, FormEmail, GroupButtonRow, Header } from '~/auth/component'
import { useAuthLoading, useOAuth } from '~/auth/hooks'
import { signUp } from '~/auth/services'
import { AUTH_ACTIONS } from '~/auth/constants'

import { MESSAGE_TYPE } from '~/message/component/message'
import { useMessageContext } from '~/message/hooks'

export default component$(() => {
  const { setMessage } = useMessageContext()
  const stateAuth = useAuthLoading()
  const { handlerGithub, handlerGoogle } = useOAuth(stateAuth)

  const handlerSubmit = $(async (event: any) => {
    if (stateAuth.isLoading) return

    stateAuth.isLoading = true
    stateAuth.actions = AUTH_ACTIONS.EMAIL

    const email: string = (event.target as HTMLFormElement).email.value
    const isTerm: boolean = (event.target as HTMLFormElement).terms.checked

    if (!isTerm || !email) {
      stateAuth.isLoading = false
      stateAuth.actions = undefined
      setMessage({
        message: 'Please check the terms and fill the email',
        type: MESSAGE_TYPE.ERROR,
      })
      return
    }

    const timestamp = Date.now()
    const password = Math.floor(Math.random() * 1000000) + email + timestamp

    const { data, error } = await signUp({ email, password })

    if (data?.user?.id) {
      setMessage({
        message: 'Perfecto! Ahora chequea tu email para activar tu cuenta',
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

    stateAuth.isLoading = false
    stateAuth.actions = undefined
  })

  return (
    <section class='w-full h-full flex justify-center items-center'>
      <AuthCard>
        <Header
          title='Sign Up'
          messageLink='sign in with your user'
          href='/sign-in'
        />
        <GroupButtonRow
          onGithub={handlerGithub}
          onGoogle={handlerGoogle}
          isLoading={stateAuth.isLoading}
          action={stateAuth.actions}
        />
        <FormEmail
          submitTitle='Sign Up'
          hasTerms={true}
          onEmail={handlerSubmit}
          isLoading={stateAuth.isLoading}
          action={stateAuth.actions}
        />
      </AuthCard>
    </section>
  )
})
