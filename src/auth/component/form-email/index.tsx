import { component$ } from '@builder.io/qwik'
import { type AuthAction, AUTH_ACTIONS } from '~/auth/constants'
import { Button } from '~/shared/components/button'
import { Spinner } from '~/shared/components/spinner'

interface FormEmailProps {
  submitTitle: string
  handlerSubmit: (event: any) => void
  hasTerms?: boolean
  isLoading?: boolean
  action?: AuthAction
}

export const FormEmail = component$<FormEmailProps>(
  ({
    submitTitle,
    handlerSubmit,
    hasTerms = false,
    isLoading = false,
    action = undefined,
  }) => {
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
        <label class='w-full pt-1 flex flex-col justify-between items-start gap-1 '>
          <span>Email address</span>
          <input
            class='w-full rounded-md py-1 text-slate-800 px-2'
            id='email'
            title='email'
            type='email'
          />
        </label>
        {hasTerms && (
          <label class='p-2 flex justify-between items-center gap-1 '>
            <input id='terms' name='terms' title='terms' type='checkbox' />
            <span>Agree to terms and conditions</span>
          </label>
        )}
        <Button classText='w-full' disabled={isLoading}>
          {action === AUTH_ACTIONS.EMAIL && <Spinner />}
          {submitTitle}
        </Button>
      </form>
    )
  }
)
