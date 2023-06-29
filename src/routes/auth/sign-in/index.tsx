import { component$ } from '@builder.io/qwik'

import { SignIn } from '~/auth/component'
import { AUTH_SIGN } from '~/auth/constants'
import { useSignAuth } from '~/auth/hooks'
import { MESSAGE_TYPE, useMessageContext } from '~/message'

export default component$(() => {
  const { setMessage } = useMessageContext()
  const { handlerGithub, handlerGoogle, handlerSubmit, stateAuth } =
    useSignAuth(AUTH_SIGN.IN)

  const url = import.meta.env.PUBLIC_SUPABASE_URL
  const publicKey = import.meta.env.PUBLIC_SUPABASE_KEY
  setMessage({
    message: `ur: ${url}, key: ${publicKey}`,
    type: MESSAGE_TYPE.INFO,
  })

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
