import { component$, type QRL } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

import { type AuthAction } from '~/auth/constants'
import {
  AuthCard,
  FormEmail as FormAuth,
  GroupButtonRow,
  Header,
} from '~/auth/component'

interface SignInComponent {
  isLoading: boolean
  actions: AuthAction
  onGithub: QRL<() => void>
  onGoogle: QRL<() => void>
  onEmail: QRL<(event: any) => Promise<void>>
}

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
          <Link href='/'>Atras</Link>
          <Header
            title='Sign In'
            messageLink='sign up with new user'
            href='/sign-up'
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
