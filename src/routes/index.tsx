import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"

export default component$(() => {
  const test = "prueba"
  return (
    <>
      <h1>Hola {test}</h1>
    </>
  )
})

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
}
