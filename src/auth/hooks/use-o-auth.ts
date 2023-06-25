import { $, useComputed$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import { AUTH_ACTIONS } from '../constants'
import { signInWithGitHub } from '../services'
import type { StateAuthLoading } from '../types'

export function useOAuth(state: StateAuthLoading) {
  const location = useLocation()
  const url = useComputed$(() => `${location.url.origin}/auth/staging`)

  const handlerGoogle = $(() => {
    state.isLoading = true
    state.actions = AUTH_ACTIONS.GOOGLE
  })

  const handlerGithub = $(() => {
    state.isLoading = true
    state.actions = AUTH_ACTIONS.GITHUB
    signInWithGitHub(url.value)
  })

  return { handlerGithub, handlerGoogle }
}
