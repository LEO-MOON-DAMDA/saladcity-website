const axios = require("axios");
const fs = require("fs");
require("dotenv").config({ path: ".env.supabase" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// ✅ 최종 JSON 경로
const raw = fs.readFileSync("saladcity_dataset_final.json", "utf8");
const data = JSON.parse(raw);

const upload = async () => {
  for (const [table, rows] of Object.entries(data)) {
    try {
      const response = await axios.post(
        `${supabaseUrl}/rest/v1/${table}`,
        rows,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
            "Content-Type": "application/json"
          }
        }
      );
      console.log(`✅ ${table} 업로드 완료 (status: ${response.status})`);
    } catch (error) {
      console.error(`❌ ${table} 업로드 실패:`, error.response?.data || error.message);
    }
  }
};

upload();
