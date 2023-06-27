import { supabaseServer } from '~/shared/services/supabase'

export async function getUserFromServer({
  privateKey,
  jwt,
}: {
  privateKey?: string
  jwt?: string
}) {
  return await supabaseServer(privateKey!).auth.getUser(jwt!)
}

export type ProfileFromServer = {
  id: string
  email: string | undefined
  role: string | null
}

export async function getProfileFromServer({
  privateKey,
  token,
}: {
  privateKey: string
  token: string
}): Promise<ProfileFromServer> {
  const profileFromServer: ProfileFromServer = {
    id: '',
    email: undefined,
    role: null,
  }

  const { data, error } = await getUserFromServer({ privateKey, jwt: token })

  if (error || !data?.user?.id || !data?.user?.email) return profileFromServer

  const { id, email } = data.user

  if (!id || !email) return profileFromServer

  const { data: profile, error: profileError } = await supabaseServer(
    privateKey
  )
    .from('profile')
    .select('id, role')
    .eq('id', id)
    .limit(1)

  if (profileError || !profile) return profileFromServer

  profileFromServer.id = id
  profileFromServer.email = email!
  profileFromServer.role = profile[0].role

  return profileFromServer
}
