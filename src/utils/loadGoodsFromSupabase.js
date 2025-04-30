import { supabaseMenu } from "../utils/supabaseMenuClient";

export async function loadGoodsFromSupabase() {
  const { data, error } = await supabaseMenu
    .from("market_goods")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Supabase에서 데이터 불러오기 실패:", error.message);
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return data;
}
