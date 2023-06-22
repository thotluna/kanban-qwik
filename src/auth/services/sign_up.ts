import { supabase } from '~/shared/services/supabase'

export async function signUp({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  return { data, error }
}
