import { supabase } from "../utils/supabaseClient";

// ✅ 승인된 Outpost를 stores 테이블에 추가 (중복검사 완전 제거)
export async function addStoreFromOutpost(application) {
  const { error } = await supabase.from("stores").insert([
    {
      store_name: application.store_name,
      address: application.address,
      phone: application.phone,
      category: "Outpost",
    },
  ]);

  if (error) throw new Error(error.message);
}

// ✅ 매장 삭제 (store_name 기준 삭제)
export async function deleteStoreByName(storeName) {
  const { data: store, error: fetchError } = await supabase
    .from("stores")
    .select("id")
    .eq("store_name", storeName)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);
  if (!store) {
    console.log("✅ 삭제할 매장이 존재하지 않음:", storeName);
    return;
  }

  const { error: deleteError } = await supabase
    .from("stores")
    .delete()
    .eq("id", store.id);

  if (deleteError) throw new Error(deleteError.message);
}

// ✅ 매장 전체 조회
export async function fetchStores() {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// ✅ 매장 직접 추가
export async function addStore(store) {
  const { error } = await supabase.from("stores").insert([
    {
      store_name: store.store_name,
      address: store.address,
      phone: store.phone,
      category: store.category || "Outpost",
    },
  ]);

  if (error) throw new Error(error.message);
}

// ✅ 매장 수정 (store id 기준)
export async function updateStore(id, updatedFields) {
  const { error } = await supabase
    .from("stores")
    .update(updatedFields)
    .eq("id", id);

  if (error) throw new Error(error.message);
}

// ✅ 매장 삭제 (id 기준)
export async function deleteStoreById(id) {
  const { error } = await supabase
    .from("stores")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
