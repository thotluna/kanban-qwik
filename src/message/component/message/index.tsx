import { component$ } from '@builder.io/qwik'
import { useMessageContext } from '~/message/hooks'
import { CloseIcon } from '~/shared/components/icons'

export enum MESSAGE_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export const Message = component$(() => {
  const state = useMessageContext()

  const color =
    state.type === MESSAGE_TYPE.SUCCESS
      ? 'bg-emerald-400 border-slate-50'
      : state.type === MESSAGE_TYPE.ERROR
      ? 'bg-red-400 border-slate-50'
      : 'bg-blue-400 border-slate-50'

  return (
    <>
      {state.message && (
        <section class='absolute w-full  bottom-4 p-2 flex justify-center items-center'>
          <span
            class={[
              'relative min-h-[58px] border-2 w-2/3 px-4 py-2 rounded-full overflow-hidden text-slate-50 text-xl flex items-center justify-start',
            ]}
          >
            <div
              class={[
                'absolute top-0 left-0 w-full h-full  opacity-90 -z-0',
                color,
              ]}
            ></div>
            <button
              onClick$={state.clear}
              class='absolute top-1 right-1 text-2xl text-slate-50 hover:scale-150 transition-all duration-200'
            >
              <CloseIcon />
            </button>
            <span class='z-20 text-base'>{state.message}</span>
          </span>
        </section>
      )}
    </>
  )
})
