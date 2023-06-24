import type { MESSAGE_TYPE } from '../constants'

export type MessageObject = {
  message?: string
  type: MESSAGE_TYPE.ERROR | MESSAGE_TYPE.SUCCESS | MESSAGE_TYPE.INFO
}
