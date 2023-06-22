import { $, useContext } from '@builder.io/qwik'
import { MessageContext, type MessageObject } from '../context'

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
