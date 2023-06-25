import { type RequestHandler } from '@builder.io/qwik-city'

type AccessType = {
  accessToken?: string
  refreshToken?: string
}

export const onGet: RequestHandler = ({ json, cookie }) => {
  cookie.set('server-access-token', '', { expires: new Date() })
  cookie.set('server-refresh-token', '', { expires: new Date() })
  json(200, { message: 'Cookies expired' })
}

export const onPost: RequestHandler = async ({
  request,
  json,
  cookie,
  env,
}) => {
  const access: AccessType = await request.json()

  if (!access?.accessToken || !access?.refreshToken) {
    json(401, { message: 'Missing tokens' })
  }

  const dateAccess = new Date()
  const dateRefresh = new Date()

  dateAccess.setHours(dateAccess.getHours() + 1)
  dateRefresh.setDate(dateRefresh.getDate() + 1)

  cookie.set('server-access-token', access.accessToken!, {
    secure: env.get('NODE_ENV') != 'development',
    httpOnly: true,
    expires: dateAccess,
    sameSite: 'lax',
  })
  cookie.set('server-refresh-token', access.refreshToken!, {
    secure: env.get('NODE_ENV') != 'development',
    httpOnly: true,
    expires: dateRefresh,
    sameSite: 'lax',
  })

  json(200, { message: 'Tokens stored' })
}
