import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.supabase" });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const data = JSON.parse(fs.readFileSync("menuItems_with_dressing.json", "utf8"));

const upload = async () => {
  const { data: result, error } = await supabase
    .from("menu_items")
    .insert(data);

  if (error) {
    console.error("❌ 업로드 실패:", error.message);
  } else {
    console.log("✅ 업로드 성공:", result);
  }
};

upload();

