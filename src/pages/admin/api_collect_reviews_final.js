import { exec } from "child_process";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { platform = "baemin", mode = "daily", store = "all" } = req.body;

  const script = {
    baemin: "success_review_dadamdav6.js",
    coupang: "success_review_coupang_v1.js",
    yogiyo: "success_review_yogiyo_v1.js"
  }[platform] || "success_review_dadamdav6.js";

  const cmd = `node ${script} ${platform} ${mode} ${store}`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ 수집 실패:', error);
      return res.status(500).json({ message: '실패: ' + error.message });
    }
    console.log(stdout);
    res.status(200).json({ message: `✅ ${platform} 수집 완료`, log: stdout });
  });
}
