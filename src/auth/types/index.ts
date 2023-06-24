import type { QRL } from '@builder.io/qwik'
import type { AUTH_ACTIONS } from '../constants'

export interface SignInComponent {
  isLoading: boolean
  actions: AuthAction
  onGithub: QRL<() => void>
  onGoogle: QRL<() => void>
  onEmail: QRL<(email: string) => Promise<void>>
}

export type StateAuthLoading = {
  isLoading: boolean
  actions: AuthAction
}

export type AuthAction =
  | AUTH_ACTIONS.EMAIL
  | AUTH_ACTIONS.GITHUB
  | AUTH_ACTIONS.GOOGLE
  | undefined
