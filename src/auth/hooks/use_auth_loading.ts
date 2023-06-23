import { useStore } from '@builder.io/qwik'
import { AUTH_ACTIONS, type AuthAction } from '../constants'

export type StateAuthLoading = {
  isLoading: boolean
  actions: AuthAction
}

export function useAuthLoading() {
  const state = useStore<StateAuthLoading>({
    isLoading: false,
    actions: AUTH_ACTIONS.EMAIL,
  })

  return state
}
