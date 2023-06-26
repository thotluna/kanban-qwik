import { $, component$ } from '@builder.io/qwik'
import { type DocumentHead, Link, useNavigate } from '@builder.io/qwik-city'
import { useUserSession } from '~/auth/hooks'
import { signout } from '~/auth/services'
import { Button, BUTTON_TYPE } from '~/shared/components/button'

export default component$(() => {
  const { state: userSession } = useUserSession()
  const navigate = useNavigate()

  const signOutHandler = $(async () => {
    await signout()
    navigate('/')
  })

  return (
    <>
      <header class='w-full p-4 bg-slate-700 flex items-center justify-between'>
        <h3 class='text-2xl'>KANBAN QWIK</h3>
        <nav class='flex items-center justify-end gap-2'>
          <Link href='/'>Refresh</Link>
          {userSession.isLoggedIn && (
            <>
              <Button
                type={BUTTON_TYPE.LINK}
                href={`/${userSession.userName}/boards`}
              >
                Dashboard
              </Button>
              <Button onClickButton={signOutHandler}>Sign Out</Button>
            </>
          )}
          {!userSession.isLoggedIn && (
            <>
              <Link
                class='px-4 py-2 border-2 font-semibold border-emerald-500 rounded-md text-emerald-500 hover:bg-emerald-400 transition-colors duration-300 hover:text-slate-700 hover:border-transparent'
                href='/auth/sign-up'
              >
                Register
              </Link>
              <Link
                class='px-4 py-2 border-2 font-semibold border-emerald-500 bg-emerald-700 rounded-md text-slate-50  transition-colors duration-300 hover:bg-emerald-400 hover:text-slate-800 hover:border-transparent'
                href='/auth/sign-in'
              >
                Sing In
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
