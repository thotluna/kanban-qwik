import { supabase } from '~/shared/services/supabase'

export async function signInOpt({
  email,
  redirect,
}: {
  email: string
  redirect: string
}) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirect,
    },
  })

  return { data, error }
}
