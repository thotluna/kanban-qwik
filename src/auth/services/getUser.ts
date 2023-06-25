import { supabase, supabaseServer } from '~/shared/services/supabase'

export async function getUser() {
  const { data, error } = await supabase.auth.getUser()

  return { data, error }
}

export async function getUserFromServer({
  privateKey,
  jwt,
}: {
  privateKey?: string
  jwt?: string
}) {
  return await supabaseServer(privateKey!).auth.getUser(jwt!)
}
