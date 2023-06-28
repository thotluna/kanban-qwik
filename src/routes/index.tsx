import { $, component$, useSignal } from '@builder.io/qwik'
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city'
import { useUserSession } from '~/auth/hooks'
import { Auth } from '~/auth/services'
import { MenuIcon } from '~/shared/components'
import { Button, BUTTON_TYPE } from '~/shared/components/button'

export default component$(() => {
  const { state: userSession } = useUserSession()
  const navigate = useNavigate()

  const signOutHandler = $(async () => {
    await Auth().signOut()
    navigate('/')
  })

  const opneMenu = useSignal(false)

  return (
    <>
      <header class='w-full p-4 bg-slate-700 flex flex-col gap-2 md:flex-row items-center justify-between '>
        <div
          onFocus$={() => console.log('hello')}
          class='w-full flex-1 flex items-center justify-between'
        >
          <h3 class='text-2xl'>KANBAN QWIK</h3>
          <button
            onClick$={() => (opneMenu.value = !opneMenu.value)}
            class='p-2 text-emerald-500 hover:text-emerald-300 md:hidden'
          >
            <MenuIcon size={32} />
          </button>
        </div>
        <nav
          class={[
            'w-full  flex flex-col  items-center justify-end gap-2 transition-all duration-300',
            'md:w-auto md:flex-row md:inline-flex',
            { hidden: !opneMenu.value },
          ]}
        >
          {userSession.isLoggedIn && (
            <>
              <Button
                classText='w-full md:w-auto'
                type={BUTTON_TYPE.LINK}
                href={`/${userSession.userName}/boards`}
                primary
              >
                Dashboard
              </Button>
              <Button
                classText='w-full md:w-auto'
                onClickButton={signOutHandler}
              >
                Sign Out
              </Button>
            </>
          )}
          {!userSession.isLoggedIn && (
            <>
              <Button
                classText='w-full md:w-auto'
                type={BUTTON_TYPE.LINK}
                href='/auth/sign-up'
              >
                Sign Up
              </Button>
              <Button
                classText='w-full md:w-auto'
                type={BUTTON_TYPE.LINK}
                href='/auth/sign-in'
                primary
              >
                Sing In
              </Button>
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
