import { exec } from 'child_process';

export default async function handler(req, res) {
  exec('node uploadReviewsToSupabase_vFinal.js', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ 업로드 실패:', error);
      return res.status(500).json({ message: '업로드 실패: ' + error.message });
    }
    console.log(stdout);
    res.status(200).json({ message: '✅ 업로드 완료', log: stdout });
  });
}