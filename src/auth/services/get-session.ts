import { supabase } from '~/shared/services/supabase'

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()

  return { data, error }
}
