import { createClient } from '@supabase/supabase-js'

// ONE real Supabase project for both platforms — web and native are two front ends on
// the same live backend/database, never a separate mobile data store.
export const SUPABASE_URL = 'https://tplbogyuyhttcszfdotk.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbGJvZ3l1eWh0dGNzemZkb3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzE0NDEsImV4cCI6MjA5ODE0NzQ0MX0.xsunlwS7k30_WQ9KGxrs5rd_dkq4mNmuoXW7F_J8bG0'

// storage: pass AsyncStorage on native (no localStorage in React Native), omit on web to
// use supabase-js's own default (localStorage) — same pattern backyard-coach and
// backyard-coach-mobile already used before this got shared.
export function createSupabaseClient({ storage } = {}) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, storage ? {
    auth: { storage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
  } : undefined)
}
