import { supabase } from '../../shared/services/supabase'

export async function signInWithGitHub(redirectTo: string) {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectTo,
    },
  })
}
