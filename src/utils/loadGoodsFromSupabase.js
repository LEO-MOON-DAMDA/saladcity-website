import { supabase } from "../lib/supabase";

export async function loadGoodsFromSupabase() {
  const { data, error } = await supabase
    .from("market_goods") // ✅ 테이블명 수정
    .select("*")
    .eq("is_deleted", false) // ✅ 숨긴 상품 제외
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Supabase에서 데이터 불러오기 실패:", error.message);
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return data;
}
