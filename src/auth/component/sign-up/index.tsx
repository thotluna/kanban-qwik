import { component$ } from '@builder.io/qwik'
import type { SignInComponent } from '~/auth/types'
import { AuthCard, Header, GroupButtonRow, FormEmail } from '~/auth/component'

export const SignUp = component$<SignInComponent>(
  ({
    onGithub: handlerGithub,
    onGoogle: handlerGoogle,
    onEmail: handlerSubmit,
    isLoading,
    actions,
  }) => {
    return (
      <section class='w-full h-full flex justify-center items-center'>
        <AuthCard>
          <Header
            title='Sign Up'
            messageLink='sign in with your user'
            href='/auth/sign-in'
          />
          <GroupButtonRow
            onGithub={handlerGithub}
            onGoogle={handlerGoogle}
            isLoading={isLoading}
            action={actions}
          />
          <FormEmail
            submitTitle='Sign Up'
            hasTerms={true}
            onEmail={handlerSubmit}
            isLoading={isLoading}
            action={actions}
          />
        </AuthCard>
      </section>
    )
  }
)
