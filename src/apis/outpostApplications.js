import { supabaseOutpost } from "../utils/supabaseOutpostClient";

// ✅ Outpost 신청 데이터 전체 조회
export async function fetchOutpostApplications() {
  const { data, error } = await supabaseOutpost
    .from("outpost_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// ✅ Outpost 신청 데이터 추가
export async function addOutpostApplication(application) {
  const { error } = await supabaseOutpost.from("outpost_applications").insert([
    {
      name: application.name,
      phone: application.phone,
      store_name: application.storeName,
      address: application.address,
      memo: application.memo,
      status: "신청완료",
    },
  ]);

  if (error) throw new Error(error.message);
}

// ✅ Outpost 신청 데이터 삭제 (id 기준)
export async function deleteOutpostApplication(id) {
  const { error } = await supabaseOutpost
    .from("outpost_applications")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}

// ✅ Outpost 신청 상태 업데이트 (id 기준, 결과 무시)
export async function updateOutpostApplicationStatus(id, newStatus) {
  const { error } = await supabaseOutpost
    .from("outpost_applications")
    .update({ status: newStatus })
    .eq("id", id); // ❗ select, returning, single 없이 깔끔하게

  if (error) throw new Error(error.message);
}
