import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_OUTPOST_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_OUTPOST_KEY;

export const supabaseOutpost = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,        // ✅ 세션 저장
    autoRefreshToken: true       // ✅ 자동 로그인 유지
  }
});
