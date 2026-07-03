import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Server-side Supabase client for use in Server Components and Route Handlers.
 * Uses service role or anon key depending on the operation needed.
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export function createServerSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        throw new Error('Missing Supabase env variables (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)');
    }
    return createClient<Database>(url, key, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
}
