import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// URL e chave PUBLICÁVEL (segura para o cliente; o acesso é limitado por RLS).
// Nunca colocar a service role key aqui. Podem ser sobrescritas por .env.local.
const url = import.meta.env.VITE_SUPABASE_URL ?? 'https://qptxcdksufdpbxddqpsw.supabase.co';
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_i1bBZiuscCfyqaef5qkcyQ_sgioy4_m';

export const supabase: SupabaseClient | null = url && key ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } }) : null;
