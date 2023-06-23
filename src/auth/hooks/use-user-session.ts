import { useContext } from '@builder.io/qwik'
import { UserSessionContext } from '../contexts'

export function useUserSession() {
  const state = useContext(UserSessionContext)

  if (!state) {
    throw new Error('Please validate your provider context for User Session')
  }

  return state
}
