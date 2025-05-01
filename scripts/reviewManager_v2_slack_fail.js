import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { notifySlack } from "./notifySlack.js";

const [platform = "baemin", mode = "daily", store = "all"] = process.argv.slice(2);

const today = new Date().toISOString().split("T")[0];
const logDir = path.join("logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const logPath = path.join(logDir, `manager_${today}.txt`);

function log(message) {
  console.log(message);
  fs.appendFileSync(logPath, message + "\n", "utf-8");
}

(async () => {
  log(`▶ 리뷰 수집 시작: ${platform}, ${mode}, ${store}`);
  try {
    execSync(`node success_review_dadamdav6.js ${platform} ${mode} ${store}`, { stdio: "inherit" });
    log("✅ 리뷰 수집 완료");
  } catch (err) {
    log("❌ 리뷰 수집 실패: " + err.message);
    await notifySlack(`❌ 리뷰 수집 실패 (${platform}/${mode}/${store})\n${err.message}`);
    process.exit(1);
  }

  try {
    execSync("node uploadReviewsToSupabase_vFinal_autoload.js", { stdio: "inherit" });
    log("✅ Supabase 업로드 완료");
  } catch (err) {
    log("❌ Supabase 업로드 실패: " + err.message);
    await notifySlack(`❌ Supabase 업로드 실패 (${platform}/${mode}/${store})\n${err.message}`);
    process.exit(1);
  }

  log("✅ 전체 완료");
  await notifySlack(`✅ 리뷰 수집 + 업로드 완료 (${platform}/${mode}/${store})`);
})();
