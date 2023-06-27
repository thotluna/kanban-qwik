import { MESSAGE_TYPE } from '~/message/constants'
import { Auth } from '../services'

export async function signUpHelper({ email }: { email: string }) {
  const timestamp = Date.now()
  const password = Math.floor(Math.random() * 1000000) + email + timestamp

  const { data, error } = await Auth().signUp({ email, password })

  const result = { message: '', type: MESSAGE_TYPE.INFO }
  if (data?.user?.id) {
    result.message = 'Perfecto! Ahora chequea tu email para activar tu cuenta'
    result.type = MESSAGE_TYPE.SUCCESS
  } else {
    result.message =
      'Uff! Hemos tenido un problema al registrarte. Inténtalo más tarde ' +
      error?.message
    result.type = MESSAGE_TYPE.ERROR
    console.error({ error })
  }

  return result
}
