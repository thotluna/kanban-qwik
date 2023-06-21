import { component$, Slot } from '@builder.io/qwik'

export const AuthCard = component$(() => {
  return (
    <article class='w-72 p-4 bg-slate-700 rounded-md flex flex-col justify-center items-center gap-2'>
      <Slot />
    </article>
  )
})
