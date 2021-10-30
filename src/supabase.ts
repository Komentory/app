import { createClient } from '@supabase/supabase-js'

// Define Supabase environment variables.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

/**
 * @name supabase
 * @description Exporting Supabase client for create a new instance.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
