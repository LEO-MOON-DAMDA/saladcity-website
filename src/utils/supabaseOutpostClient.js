// src/utils/supabaseOutpostClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cgcfnxjscqglqxdbbypd.supabase.co"; // Outpost용 URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnY2ZueGpzY3FnbHF4ZGJieXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MTQ4NDYsImV4cCI6MjA2MTM5MDg0Nn0.ELrxGHeWhmhkcsDsXhERUcumby7j673QsbqB2WfcD4M"; // Outpost용 anon key

export const supabaseOutpost = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);