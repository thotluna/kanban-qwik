import { $, component$ } from '@builder.io/qwik'
import { AuthCard } from '~/auth/component/auth-card'
import { FormEmail } from '~/auth/component/form-email'
import { GroupButtonRow } from '~/auth/component/group-button-row'
import { Header } from '~/auth/component/header'
import { MESSAGE_TYPE } from '~/message/component/message'
import { useMessageContext } from '~/message/hooks'

export default component$(() => {
  const stateMessage = useMessageContext()

  const handlerSubmit = $(() => {})

  const handlerGoogle = $(() => {
    stateMessage.setMessage({
      type: MESSAGE_TYPE.SUCCESS,
      message: 'Google login',
    })
  })

  const handlerGithub = $(() => {})

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
        />
        <FormEmail
          submitTitle='Sign Up'
          hasTerms={true}
          handlerSubmit={handlerSubmit}
        />
      </AuthCard>
    </section>
  )
})
