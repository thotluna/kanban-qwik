import { $, component$ } from '@builder.io/qwik'
import { AuthCard } from '~/auth/component/auth-card'
import { FormEmail } from '~/auth/component/form-email'
import { GroupButtonRow } from '~/auth/component/group-button-row'
import { Header } from '~/auth/component/header'
import { AUTH_ACTIONS } from '~/auth/constants'
import { useAuthLoading } from '~/auth/hooks/use_auth_loading'

export default component$(() => {
  const { isLoading, actions } = useAuthLoading()

  const handlerSubmit = $(() => {
    isLoading.value = true
    actions.value = AUTH_ACTIONS.EMAIL
  })

  const googleHandler = $(() => {
    isLoading.value = true
    actions.value = AUTH_ACTIONS.GOOGLE
  })

  const githubHandler = $(() => {
    isLoading.value = true
    actions.value = AUTH_ACTIONS.GITHUB
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
          githubHandler={githubHandler}
          googleHandler={googleHandler}
          isLoading={isLoading.value}
          action={actions.value}
        />
        <FormEmail
          submitTitle='Sign In'
          handlerSubmit={handlerSubmit}
          isLoading={isLoading.value}
          action={actions.value}
        />
      </AuthCard>
    </section>
  )
})
