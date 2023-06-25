import { component$, Slot } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

export enum BUTTON_TYPE {
  BUTTON = 'button',
  LINK = 'link',
}

interface ButtonProps {
  type?: BUTTON_TYPE.BUTTON | BUTTON_TYPE.LINK
  onClickButton?: () => void
  href?: string
  classText?: string
  disabled?: boolean
}

export const Button = component$<ButtonProps>(
  ({
    onClickButton,
    href = undefined,
    classText = '',
    disabled = false,
    type = BUTTON_TYPE.BUTTON,
  }) => {
    return (
      <>
        {type === BUTTON_TYPE.BUTTON && (
          <button
            class={[
              'px-4 py-2 border-2 font-semibold border-emerald-500 rounded-md text-emerald-500 hover:bg-emerald-400  hover:text-slate-700 hover:border-transparent active:right-1 active:ring-slate-50 disabled:text-slate-500 disabled:pointer-events-none transition-all duration-300 ease-in-out',
              classText,
            ]}
            onClick$={onClickButton}
            disabled={disabled}
          >
            <span class='flex justify-center items-center gap-2'>
              <Slot />
            </span>
          </button>
        )}

        {type === BUTTON_TYPE.LINK && (
          <Link
            class={[
              'px-4 py-2 border-2 font-semibold border-emerald-500 rounded-md text-emerald-500 hover:bg-emerald-400 transition-colors duration-300 hover:text-slate-700 hover:border-transparent',
              disabled
                ? 'disabled:text-slate-500 disabled:pointer-events-none'
                : '',
              classText,
            ]}
            href={href}
          >
            <span class='flex justify-center items-center gap-2'>
              <Slot />
            </span>
          </Link>
        )}
      </>
    )
  }
)
