import { supabase } from "../lib/supabase";

export async function saveToSupabase(data) {
  const { error } = await supabase.from("goods").insert([data]);

  if (error) {
    console.error("❌ Supabase 저장 실패:", error.message);
    throw new Error("상품 등록 중 오류가 발생했습니다.");
  }

  console.log("✅ Supabase 저장 성공");
}
