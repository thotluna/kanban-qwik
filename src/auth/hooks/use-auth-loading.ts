import { useStore } from '@builder.io/qwik'
import { AUTH_ACTIONS } from '../constants'
import type { StateButtonAuthLoading } from '../types'

export function useAuthLoading() {
  const state = useStore<StateButtonAuthLoading>({
    isLoading: false,
    actions: AUTH_ACTIONS.EMAIL,
  })

  return state
}
