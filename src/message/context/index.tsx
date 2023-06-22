import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'
import { MESSAGE_TYPE } from '../component/message'

export type MessageObject = {
  message?: string
  type: MESSAGE_TYPE.ERROR | MESSAGE_TYPE.SUCCESS | MESSAGE_TYPE.INFO
}

export const MessageContext = createContextId<MessageObject>('message_context')

export const MessageProvider = component$(() => {
  const messageStore = useStore<MessageObject>({
    message: undefined,
    type: MESSAGE_TYPE.INFO,
  })

  useContextProvider(MessageContext, messageStore)

  return <Slot />
})
