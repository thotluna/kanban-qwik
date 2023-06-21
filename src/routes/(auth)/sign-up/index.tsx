import { $, component$ } from '@builder.io/qwik'
import { AuthCard } from '~/auth/component/auth-card'
import { FormEmail } from '~/auth/component/form-email'
import { GroupButtonRow } from '~/auth/component/group-button-row'
import { Header } from '~/auth/component/header'

export default component$(() => {
  const handlerSubmit = $(() => {
    console.log('submit')
  })

  const handlerGoogle = $(() => {})

  const handlerGithub = $(() => {})

  return (
    <section class='w-full h-full flex justify-center items-center'>
      <AuthCard>
        <Header
          title='Sign Up'
          messageLink='Sign In with your user'
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
