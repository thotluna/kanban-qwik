import { supabase } from '~/shared/services/supabase'

export async function getUser() {
  const { data, error } = await supabase.auth.getUser()

  return { data, error }
}
