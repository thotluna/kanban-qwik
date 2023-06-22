import { $, component$, useSignal } from '@builder.io/qwik'
import { AuthCard } from '~/auth/component/auth-card'
import { FormEmail } from '~/auth/component/form-email'
import { GroupButtonRow } from '~/auth/component/group-button-row'
import { Header } from '~/auth/component/header'
import { MESSAGE_TYPE } from '~/message/component/message'
import { useMessageContext } from '~/message/hooks'

export default component$(() => {
  const stateMessage = useMessageContext()
  const isLoading = useSignal(false)

  const handlerSubmit = $(() => {
    isLoading.value = true
    stateMessage.setMessage({
      message: 'Esto es una prueba',
      type: MESSAGE_TYPE.SUCCESS,
    })
  })

  const googleHandler = $(() => {
    isLoading.value = true
    stateMessage.setMessage({
      message: 'Esto es una prueba',
      type: MESSAGE_TYPE.ERROR,
    })
  })

  return (
    <section class='w-full h-full flex justify-center items-center'>
      <AuthCard>
        <Header
          title='Sign In'
          messageLink='sign up with new user'
          href='/sign-up'
        />
        <GroupButtonRow
          githubHandler={googleHandler}
          googleHandler={googleHandler}
          isLoading={isLoading.value}
        />
        <FormEmail
          submitTitle='Sign In'
          handlerSubmit={handlerSubmit}
          isLoading={isLoading.value}
        />
      </AuthCard>
    </section>
  )
})
