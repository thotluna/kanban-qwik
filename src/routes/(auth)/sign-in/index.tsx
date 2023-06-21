import { $, component$ } from '@builder.io/qwik'
import { AuthCard } from '~/auth/component/auth-card'
import { FormEmail } from '~/auth/component/form-email'
import { GroupButtonRow } from '~/auth/component/group-button-row'
import { Header } from '~/auth/component/header'

const googleHandler = $(() => {})

export default component$(() => {
  const handlerSubmit = $(() => {
    console.log('submit')
  })
  return (
    <section class='w-full h-full flex justify-center items-center'>
      <AuthCard>
        <Header
          title='Sign In'
          messageLink='Sign Up with new user'
          href='/sign-up'
        />
        <GroupButtonRow
          githubHandler={googleHandler}
          googleHandler={googleHandler}
        />
        <FormEmail submitTitle='Sign In' handlerSubmit={handlerSubmit} />
      </AuthCard>
    </section>
  )
})
