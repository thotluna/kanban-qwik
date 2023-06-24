import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'
import { MESSAGE_TYPE } from '../constants'
import type { MessageObject } from '../types'

export const MessageContext = createContextId<MessageObject>('message_context')

export const MessageProvider = component$(() => {
  const messageStore = useStore<MessageObject>({
    message: undefined,
    type: MESSAGE_TYPE.INFO,
  })

  useContextProvider(MessageContext, messageStore)

  return <Slot />
})
