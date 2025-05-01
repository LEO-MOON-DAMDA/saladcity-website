import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_MENU_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_MENU_KEY;

export const supabaseMenu = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

