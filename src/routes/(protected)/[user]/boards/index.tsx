import { component$ } from '@builder.io/qwik'
import { Link, routeLoader$ } from '@builder.io/qwik-city'

export const useGetBoards = routeLoader$(async ({ params }) => {
  const usr = params.user

  return usr
})

export default component$(() => {
  const usr = useGetBoards().value
  return (
    <>
      <Link href='/'>Home</Link>

      <h1 class='text-5xl'>{usr}</h1>
    </>
  )
})
