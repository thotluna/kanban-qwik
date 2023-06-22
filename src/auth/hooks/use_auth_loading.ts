import { useSignal } from '@builder.io/qwik'
import { type AuthAction } from '../constants'

export function useAuthLoading() {
  const isLoading = useSignal(false)
  const actions = useSignal<AuthAction>()

  return { isLoading, actions }
}
