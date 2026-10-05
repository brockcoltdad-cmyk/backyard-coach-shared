import { createClient } from '@supabase/supabase-js'

// ONE real Supabase project for both platforms — web and native are two front ends on
// the same live backend/database, never a separate mobile data store.
export const SUPABASE_URL = 'https://tplbogyuyhttcszfdotk.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_Cyo9S4LRAbdvV-wAZYEc6g_Hsnpdj25'

// storage: pass AsyncStorage on native (no localStorage in React Native), omit on web to
// use supabase-js's own default (localStorage) — same pattern backyard-coach and
// backyard-coach-mobile already used before this got shared.
export function createSupabaseClient({ storage } = {}) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, storage ? {
    auth: { storage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
  } : undefined)
}
