// src/utils/supabaseMenuClient.js
import { createClient } from "@supabase/supabase-js";

// ✅ .env 파일에서 불러오도록 수정
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabaseMenu = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
