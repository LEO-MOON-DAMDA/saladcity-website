import { exec } from 'child_process';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { platform = "baemin", mode = "daily", store = "all" } = req.body;

  const cmd = `node reviewManager_v2.js ${platform} ${mode} ${store}`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ 전체 실행 실패:', error);
      return res.status(500).json({ message: '실패: ' + error.message });
    }
    console.log(stdout);
    res.status(200).json({ message: '✅ 수집 + 업로드 전체 실행 완료', log: stdout });
  });
}