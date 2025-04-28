// src/apis/saveOutpostCrew.js
import { supabaseOutpost } from "../utils/supabaseOutpostClient";

export async function saveOutpostCrew(form) {
  const { data, error } = await supabaseOutpost
    .from("outpost_crew")
    .insert([
      {
        nickname: form.nickname,
        phone: form.phone,
        email: form.email,
        region: form.region,
        interest: form.interest,
        note: form.note,
      }
    ]);

  if (error) {
    console.error("샐시크루 저장 실패:", error.message);
    throw new Error(error.message);
  }

  return data;
}
