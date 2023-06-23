import { $ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import { MESSAGE_TYPE } from '~/message/component/message'
import { useMessageContext } from '~/message/hooks'
import { AUTH_ACTIONS } from '../constants'
import { signInOpt } from '../services'
import { useOAuth } from './use-o-auth'
import { useAuthLoading } from './use-auth-loading'

export function useSignInByEmail() {
  const { setMessage } = useMessageContext()
  const stateAuth = useAuthLoading()
  const { handlerGithub, handlerGoogle } = useOAuth(stateAuth)

  const location = useLocation()

  const handlerSubmit = $(async (event: any) => {
    if (stateAuth.isLoading) return
    stateAuth.isLoading = true
    stateAuth.actions = AUTH_ACTIONS.EMAIL

    const email: string = (event.target as HTMLFormElement).email.value

    if (!email) {
      stateAuth.isLoading = false
      stateAuth.actions = undefined
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

    stateAuth.isLoading = false
    stateAuth.actions = undefined
  })

  return {
    stateAuth,
    handlerGithub,
    handlerGoogle,
    handlerSubmit,
  }
}
