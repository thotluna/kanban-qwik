import { createClient } from '@supabase/supabase-js'

const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } = import.meta.env
export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

export const supabaseServer = (privateKey: string) => {
  return createClient(PUBLIC_SUPABASE_URL, privateKey)
}
