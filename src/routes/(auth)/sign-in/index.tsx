import { component$ } from '@builder.io/qwik'

import { SignIn } from '~/auth/component'
import { useSignInByEmail as useSignIn } from '~/auth/hooks'

export default component$(() => {
  const { handlerGithub, handlerGoogle, handlerSubmit, stateAuth } = useSignIn()

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
