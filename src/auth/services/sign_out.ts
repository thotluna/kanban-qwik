import { supabase } from '../../shared/services/supabase'

export async function signout() {
  await supabase.auth.signOut()
}
