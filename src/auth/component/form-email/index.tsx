import { component$ } from '@builder.io/qwik'
import { Button } from '~/shared/components/button'

interface FormEmailProps {
  submitTitle: string
  handlerSubmit: () => void
  hasTerms?: boolean
}

export const FormEmail = component$<FormEmailProps>(
  ({ submitTitle, handlerSubmit, hasTerms = false }) => {
    return (
      <form
        onSubmit$={handlerSubmit}
        preventdefault:click
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
            class='w-full rounded-md py-1'
            id='email'
            title='email'
            type='email'
          />
        </label>
        {hasTerms && (
          <label class='p-2 flex justify-between items-center gap-1 '>
            <input type='checkbox' />
            <span>Agree to terms and conditions</span>
          </label>
        )}
        <Button classText='w-full'>{submitTitle}</Button>
      </form>
    )
  }
)