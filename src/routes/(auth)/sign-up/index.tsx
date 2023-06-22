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
  })

  const handlerGoogle = $(() => {
    isLoading.value = true
    stateMessage.setMessage({
      type: MESSAGE_TYPE.SUCCESS,
      message: 'Google login',
    })
  })

  const handlerGithub = $(() => {
    isLoading.value = true
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
          githubHandler={handlerGithub}
          googleHandler={handlerGoogle}
          isLoading={isLoading.value}
        />
        <FormEmail
          submitTitle='Sign Up'
          hasTerms={true}
          handlerSubmit={handlerSubmit}
          isLoading={isLoading.value}
        />
      </AuthCard>
    </section>
  )
})
