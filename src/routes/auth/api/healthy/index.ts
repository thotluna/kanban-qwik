import { type RequestHandler } from '@builder.io/qwik-city'

export const onGet: RequestHandler = async (ev) => {
  console.log(ev)

  ev.json(200, { hello: 'world' })
}
