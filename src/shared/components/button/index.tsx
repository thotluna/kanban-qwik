import { component$, Slot } from '@builder.io/qwik'

interface ButtonProps {
  onClickButton?: () => void
  classText?: string
}

export const Button = component$<ButtonProps>(
  ({ onClickButton, classText = '' }) => {
    return (
      <button
        class={[
          ' px-2 py-1 border-2 border-slate-600 text-white rounded-md  hover:bg-slate-400 hover:text-black active:right-1 active:ring-slate-50 transition-all duration-300 ease-in-out',
          classText,
        ]}
        onClick$={onClickButton}
      >
        <span class='flex justify-center items-center gap-2'>
          <Slot />
        </span>
      </button>
    )
  }
)
