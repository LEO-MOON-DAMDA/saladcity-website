import { createClient } from "@supabase/supabase-js";

// ✅ Outpost 관리자 인증용 Supabase 연결
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_OUTPOST_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_OUTPOST_KEY;

export const supabaseOutpost = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
