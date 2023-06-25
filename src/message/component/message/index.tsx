import { component$, useComputed$ } from '@builder.io/qwik'
import { MESSAGE_TYPE } from '~/message/constants'
import { useMessageContext } from '~/message/hooks'
import { CloseIcon } from '~/shared/components/icons'

export const Message = component$(() => {
  const { state, clear } = useMessageContext()

  const color = useComputed$(() => {
    const val =
      state.type === MESSAGE_TYPE.SUCCESS
        ? 'bg-emerald-400 border-slate-50'
        : state.type === MESSAGE_TYPE.ERROR
        ? 'bg-red-400 border-slate-50'
        : 'bg-blue-400 border-slate-50'

    return val
  })

  return (
    <>
      {state.message && (
        <section class='absolute w-full  bottom-4 p-2 flex justify-center items-center'>
          <span
            class={[
              'relative min-h-[58px] border-2 w-2/3 px-4 py-2 rounded-md overflow-hidden text-slate-50 text-xl flex items-center justify-start',
            ]}
          >
            <div
              class={[
                'absolute top-0 left-0 w-full h-full  opacity-90 -z-0',
                color.value,
              ]}
            ></div>
            <button
              onClick$={clear}
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
