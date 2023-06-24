import { $ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'

import { AUTH_ACTIONS, AUTH_SIGN } from '../constants'
import { singInHelper, signUpHelper } from '../helpers'
import { useAuthLoading, useOAuth } from '.'

import { useMessageContext } from '~/message/hooks'

export function useSignAuth(type: AUTH_SIGN.IN | AUTH_SIGN.UP) {
  const { setMessage } = useMessageContext()
  const stateAuth = useAuthLoading()
  const { handlerGithub, handlerGoogle } = useOAuth(stateAuth)

  const location = useLocation()

  const handlerSubmit = $(async (email: string) => {
    if (stateAuth.isLoading) return
    stateAuth.isLoading = true
    stateAuth.actions = AUTH_ACTIONS.EMAIL

    const messageResult =
      type === AUTH_SIGN.IN
        ? await singInHelper({ email, location })
        : await signUpHelper({ email })

    setMessage({
      message: messageResult.message,
      type: messageResult.type,
    })

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
