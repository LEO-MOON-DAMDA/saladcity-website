import { supabase } from "../utils/supabaseClient"; // ✅ 경로 수정 완료

// ✅ Outpost 신청/승인/거절 통계 가져오기
export async function fetchOutpostStats() {
  const { data: applications, error } = await supabase
    .from("outpost_applications")
    .select("status");

  if (error) throw new Error(error.message);

  const stats = {
    total: applications.length,
    approved: applications.filter((app) => app.status === "승인").length,
    rejected: applications.filter((app) => app.status === "거절").length,
    pending: applications.filter((app) => app.status === "신청완료").length,
  };

  return stats;
}
