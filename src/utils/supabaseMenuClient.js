import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_MENU_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_MENU_KEY;

export const supabaseMenu = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
