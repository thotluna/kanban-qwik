import type { RouteLocation } from '@builder.io/qwik-city'
import { MESSAGE_TYPE } from '~/message/component/message'
import type { MessageObject } from '~/message/context'
import { signInOpt } from '../services'

export async function singInHelper({
  email,
  location,
}: {
  email: string
  location: RouteLocation
}) {
  const url = `${location.url.origin}/staging`
  const { data, error } = await signInOpt({ email, redirect: url })

  const result: MessageObject = { message: '', type: MESSAGE_TYPE.INFO }

  if (data && !error) {
    result.message = 'Perfect! Now check your email to enter your account'
    result.type = MESSAGE_TYPE.SUCCESS
  } else {
    if (error?.message === 'Signups not allowed for otp') {
      result.message = 'Ugh! You are not registered. please sign up '
      result.type = MESSAGE_TYPE.ERROR
    } else {
      result.message =
        "Ugh! We've had a problem registering. Try again later" + error?.message
      result.type = MESSAGE_TYPE.ERROR
    }

    console.error({ error })
  }

  return result
}
