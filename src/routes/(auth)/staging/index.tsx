import { component$, useTask$ } from '@builder.io/qwik'
import { supabase } from '~/shared/services/supabase'

export default component$(() => {
  useTask$(async () => {
    const { data, error } = await supabase.auth.getUser()
    console.log({ data, error })
  })

  return <div>Staging</div>
})
