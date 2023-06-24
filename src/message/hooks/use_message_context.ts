import { $, useContext } from '@builder.io/qwik'
import { MessageContext } from '../context'
import type { MessageObject } from '../types'

export function useMessageContext() {
  const state = useContext(MessageContext)

  if (!state) {
    throw new Error('Please validate your provider context for Message')
  }

  const clear = $(() => {
    state.message = undefined
  })

  const setMessage = $(({ message, type }: MessageObject) => {
    state.message = message
    state.type = type
  })

  return { state, setMessage, clear }
}
