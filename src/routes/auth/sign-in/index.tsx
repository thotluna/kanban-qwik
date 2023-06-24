import { component$ } from '@builder.io/qwik'

import { SignIn } from '~/auth/component'
import { AUTH_SIGN } from '~/auth/constants'
import { useSignAuth } from '~/auth/hooks'

export default component$(() => {
  const { handlerGithub, handlerGoogle, handlerSubmit, stateAuth } =
    useSignAuth(AUTH_SIGN.IN)

  return (
    <SignIn
      isLoading={stateAuth.isLoading}
      actions={stateAuth.actions}
      onGithub={handlerGithub}
      onGoogle={handlerGoogle}
      onEmail={handlerSubmit}
    />
  )
})
