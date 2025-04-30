import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_OUTPOST_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_OUTPOST_KEY;

export const supabaseOutpost = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
