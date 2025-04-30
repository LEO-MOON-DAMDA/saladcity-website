import { createClient } from "@supabase/supabase-js";

// ✅ .env에서 환경변수로 불러오도록 수정
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
