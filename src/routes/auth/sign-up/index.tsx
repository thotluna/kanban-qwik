import { component$ } from '@builder.io/qwik'

import { SignUp } from '~/auth/component'
import { AUTH_SIGN } from '~/auth/constants'
import { useSignAuth } from '~/auth/hooks'

export default component$(() => {
  const { stateAuth, handlerGithub, handlerGoogle, handlerSubmit } =
    useSignAuth(AUTH_SIGN.UP)

  return (
    <SignUp
      isLoading={stateAuth.isLoading}
      actions={stateAuth.actions}
      onGithub={handlerGithub}
      onGoogle={handlerGoogle}
      onEmail={handlerSubmit}
    />
  )
})
