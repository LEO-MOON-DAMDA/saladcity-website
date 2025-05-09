import { exec } from "child_process";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const cmd = `node uploadReviewsToSupabase_vFinal.js`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ 업로드 실패:", error);
      return res.status(500).json({ message: "업로드 실패: " + error.message });
    }
    res.status(200).json({ message: "✅ 업로드 완료", log: stdout });
  });
}
