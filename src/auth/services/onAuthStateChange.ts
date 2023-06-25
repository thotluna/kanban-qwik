import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabase } from '~/shared/services/supabase'

type OnAuthStateChangeProps = {
  callback: (event: AuthChangeEvent, session: Session | null) => void
}

export function onAuthStateChange({ callback }: OnAuthStateChangeProps) {
  const { data: authListener } = supabase.auth.onAuthStateChange(callback)

  return { authListener }
}
