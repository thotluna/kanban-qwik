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
  primary?: boolean
  disabled?: boolean
}

export const Button = component$<ButtonProps>(
  ({
    onClickButton,
    href = undefined,
    classText = '',
    disabled = false,
    primary = false,
    type = BUTTON_TYPE.BUTTON,
  }) => {
    const colors = primary
      ? 'border-transparent bg-emerald-500 text-slate-700'
      : ' border-emerald-500 bg-transparen text-emerald-500 '

    return (
      <>
        {type === BUTTON_TYPE.BUTTON && (
          <button
            class={[
              'px-4 py-2 border-2 font-semibold rounded-md active:right-1 active:ring-slate-50 disabled:text-slate-500 hover:bg-emerald-400  hover:text-slate-700 hover:border-transparentdisabled:pointer-events-none transition-all duration-300 ease-in-out ',
              colors,
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
              'px-4 py-2 border-2 font-semibold  rounded-md  hover:bg-emerald-400 transition-colors duration-300 hover:text-slate-700 hover:border-transparent',
              colors,
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
