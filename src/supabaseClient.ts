import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ogiugaqlpvoqunwddjoc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_rygu1LDpnF0RG5iz03DeVA_PB4pPaVQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
