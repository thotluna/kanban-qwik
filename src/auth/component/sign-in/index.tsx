import { component$ } from '@builder.io/qwik'

import {
  AuthCard,
  FormEmail as FormAuth,
  GroupButtonRow,
  Header,
} from '~/auth/component'
import type { SignInComponent } from '~/auth/types'

export const SignIn = component$<SignInComponent>(
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
            title='Sign In'
            messageLink='sign up with new user'
            href='/auth/sign-up'
          />
          <GroupButtonRow
            onGithub={handlerGithub}
            onGoogle={handlerGoogle}
            isLoading={isLoading}
            action={actions}
          />
          <FormAuth
            submitTitle='Sign In'
            onEmail={handlerSubmit}
            isLoading={isLoading}
            action={actions}
          />
        </AuthCard>
      </section>
    )
  }
)
