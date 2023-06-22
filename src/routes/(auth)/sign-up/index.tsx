import { $, component$ } from '@builder.io/qwik'
import { AuthCard } from '~/auth/component/auth-card'
import { FormEmail } from '~/auth/component/form-email'
import { GroupButtonRow } from '~/auth/component/group-button-row'
import { Header } from '~/auth/component/header'
import { AUTH_ACTIONS } from '~/auth/constants'
import { useAuthLoading } from '~/auth/hooks/use_auth_loading'
import { MESSAGE_TYPE } from '~/message/component/message'
import { useMessageContext } from '~/message/hooks'

export default component$(() => {
  const stateMessage = useMessageContext()
  const { isLoading, actions } = useAuthLoading()

  const handlerSubmit = $((event: any) => {
    isLoading.value = true
    actions.value = AUTH_ACTIONS.EMAIL

    const email: string = (event.target as HTMLFormElement).email.value
    const isTerm: boolean = (event.target as HTMLFormElement).terms.checked

    console.log({ email, isTerm })

    if (!isTerm || !email) {
      isLoading.value = false
      actions.value = undefined
      stateMessage.setMessage({
        message: 'Please check the terms and fill the email',
        type: MESSAGE_TYPE.ERROR,
      })
      return
    }
  })

  const handlerGoogle = $(() => {
    isLoading.value = true
    actions.value = AUTH_ACTIONS.GOOGLE
  })

  const handlerGithub = $(() => {
    isLoading.value = true
    actions.value = AUTH_ACTIONS.GITHUB
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
          action={actions.value}
        />
        <FormEmail
          submitTitle='Sign Up'
          hasTerms={true}
          handlerSubmit={handlerSubmit}
          isLoading={isLoading.value}
          action={actions.value}
        />
      </AuthCard>
    </section>
  )
})
