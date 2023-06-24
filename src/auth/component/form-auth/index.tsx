import { $, component$, useStore } from '@builder.io/qwik'
import { type AuthAction, AUTH_ACTIONS } from '~/auth/constants'
import { Button, Spinner } from '~/shared/components'

interface FormEmailProps {
  submitTitle: string
  onEmail: (email: string) => void
  hasTerms?: boolean
  isLoading?: boolean
  action?: AuthAction
}

type ErrorState = {
  email?: string
  terms?: string
}

export const FormEmail = component$<FormEmailProps>(
  ({
    submitTitle,
    onEmail,
    hasTerms = false,
    isLoading = false,
    action = undefined,
  }) => {
    const errorState = useStore<ErrorState>({
      email: undefined,
      terms: undefined,
    })

    const handlerSubmit = $((event: any) => {
      const email = (event.target as HTMLFormElement).email?.value
      const terms = (event.target as HTMLFormElement).terms?.checked

      console.log({ email, terms })
      console.log({ terms, hasTerms })

      if (!email || email === '') {
        errorState.email = 'Email is required'
        return
      }

      const emailPatter = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm

      if (!emailPatter.test(email)) {
        errorState.email = 'Bad email'
        return
      }

      errorState.email = ''

      if (terms === false && hasTerms) {
        errorState.terms = 'Please accept the terms and conditions'
        return
      }

      errorState.terms = ''

      onEmail(email)
    })

    return (
      <form
        onSubmit$={handlerSubmit}
        preventdefault:submit
        class='w-full flex flex-col justify-between items-center gap-2 '
      >
        <div class='w-full relative  flex justify-center items-center before:absolute before:w-full before:h-[1px] before:bg-slate-400 before:bottom-[44%] before:left-0 before:right-0 '>
          <span class='text-sm bg-slate-700 text-slate-400 z-10 px-1'>
            Or sign up with your email
          </span>
        </div>
        <label class='w-full mt-1 flex flex-col justify-start items-start gap-1 '>
          <span>Email address</span>
          <input
            class={[
              'w-full rounded-md py-1 text-slate-800 px-2',
              errorState.email ? 'border-red-500' : '',
            ]}
            id='email'
            title='email'
            placeholder='your-email@gmail.com'
            // type='email'
          />
          {errorState.email && (
            <span class='text-sm text-red-500'>{errorState.email}</span>
          )}
        </label>
        {hasTerms && (
          <div class='w-full  flex flex-col items-center justify-start'>
            <label class='w-full flex justify-start items-center gap-1 '>
              <input id='terms' name='terms' title='terms' type='checkbox' />
              <span>Agree to terms and conditions</span>
            </label>
            {errorState.terms && (
              <span class='text-sm text-red-500'>{errorState.terms}</span>
            )}
          </div>
        )}

        <p class='text-sm text-slate-300 text-center my-2'>
          Password is not required. Email is used as confirmation
        </p>

        <Button classText='w-full' disabled={isLoading}>
          {action === AUTH_ACTIONS.EMAIL && isLoading && <Spinner />}
          {submitTitle}
        </Button>
      </form>
    )
  }
)
