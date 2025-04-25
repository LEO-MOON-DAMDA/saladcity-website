import { createClient } from "@supabase/supabase-js";

// ✅ 환경변수 없이 직접 Supabase 연결 정보 작성
const supabaseUrl = "https://bjcetaznlmqgjvozeeen.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqY2V0YXpubG1xZ2p2b3plZWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MzI1MjksImV4cCI6MjA2MDEwODUyOX0.5Y86eiA_14SibBxOHjVU8p60lvPjj5BBT2WhQrd_5oE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
