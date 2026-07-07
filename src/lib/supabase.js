import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ctyvshpuubavpipiliih.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_HsrZ3ScQaIXDks-u1PWAnQ_AtrRYuMA'

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key is missing. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
