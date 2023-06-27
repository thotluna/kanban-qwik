import type { QRL } from '@builder.io/qwik'
import type { AUTH_ACTIONS } from '../constants'

export interface SignInComponent {
  isLoading: boolean
  actions: AuthActionButton
  onGithub: QRL<() => void>
  onGoogle: QRL<() => void>
  onEmail: QRL<(email: string) => Promise<void>>
}

//State of action button in form the sign in and sign up pag
export type StateButtonAuthLoading = {
  isLoading: boolean
  actions: AuthActionButton
}

//Actions of buttons in the sign in and sign up page
export type AuthActionButton =
  | AUTH_ACTIONS.EMAIL
  | AUTH_ACTIONS.GITHUB
  | AUTH_ACTIONS.GOOGLE
  | undefined
