import { exec } from "child_process";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const cmd = `node success_review_dadamdav6.js baemin daily all`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ 수집 실패:", error);
      return res.status(500).json({ message: "실패: " + error.message });
    }
    res.status(200).json({ message: "✅ 수집 완료", log: stdout });
  });
}
