// src/utils/supabaseMenuClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bjcetaznlmqgjvozeeen.supabase.co"; // 메뉴용 URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqY2V0YXpubG1xZ2p2b3plZWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MzI1MjksImV4cCI6MjA2MDEwODUyOX0.5Y86eiA_14SibBxOHjVU8p60lvPjj5BBT2WhQrd_5oE"; // 메뉴용 anon key

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