import { createClient } from '@supabase/supabase-js'

const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } = import.meta.env
export const supabse = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)
