import { supabase } from "../lib/supabase";

export async function loadGoodsFromSupabase() {
  const { data, error } = await supabase
    .from("goods")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Supabase에서 데이터 불러오기 실패:", error.message);
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return data;
}
