import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

export function Auth() {
  const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } = import.meta.env
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

  const getSession = async () => {
    return await supabase.auth.getSession()
  }

  const getUser = async () => {
    return await supabase.auth.getUser()
  }

  const signInWithOtp = async ({
    email,
    redirect,
  }: {
    email: string
    redirect: string
  }) => {
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirect,
        shouldCreateUser: false,
      },
    })
  }

  const signInWithGithub = async ({ redirectTo }: { redirectTo: string }) => {
    return await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectTo,
      },
    })
  }

  const signOut = async () => {
    return await supabase.auth.signOut()
  }

  const signUp = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    return { data, error }
  }

  type OnAuthStateChangeProps = {
    callback: (event: AuthChangeEvent, session: Session | null) => void
  }

  const onAuthStateChange = ({ callback }: OnAuthStateChangeProps) => {
    const { data: authListener } = supabase.auth.onAuthStateChange(callback)

    return { authListener }
  }

  return {
    getSession,
    getUser,
    onAuthStateChange,
    signInWithGithub,
    signInWithOtp,
    signOut,
    signUp,
  }
}
