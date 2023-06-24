import { useStore } from '@builder.io/qwik'
import { AUTH_ACTIONS } from '../constants'
import type { StateAuthLoading } from '../types'

export function useAuthLoading() {
  const state = useStore<StateAuthLoading>({
    isLoading: false,
    actions: AUTH_ACTIONS.EMAIL,
  })

  return state
}
