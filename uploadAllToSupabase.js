const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
require("dotenv").config({ path: ".env.supabase" });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const raw = fs.readFileSync("saladcity_dataset.json", "utf8");
const data = JSON.parse(raw);

const upload = async () => {
  for (const [table, rows] of Object.entries(data)) {
    const { error } = await supabase.from(table).insert(rows);
    if (error) {
      console.error(`❌ ${table} 업로드 실패:`, error.message);
    } else {
      console.log(`✅ ${table} 업로드 완료`);
    }
  }
};

upload();
