import React, { useState, useEffect } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import { useNavigate } from "react-router-dom";
import "./AdminStoresPage.css";

export default function AdminStoresPage() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    type: "",
    status: "",
    memo: "",
  });

  const loadStores = async () => {
    const { data, error } = await supabaseOutpost
      .from("outpost_stores")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ 매장 데이터 불러오기 실패", error.message);
    } else {
      setStores(data);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStore = async () => {
    if (!newStore.name.trim()) {
      alert("매장 이름을 입력하세요.");
      return;
    }
    setIsProcessing(true);
    const { error } = await supabaseOutpost.from("outpost_stores").insert([newStore]);

    if (error) {
      console.error("❌ 매장 추가 실패:", error.message);
      alert("매장 추가 실패");
    } else {
      alert("✅ 매장 추가 완료");
      setNewStore({ name: "", type: "", status: "", memo: "" });
      loadStores();
    }
    setIsProcessing(false);
  };

  const handleDeleteStore = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setIsProcessing(true);
    const { error } = await supabaseOutpost.from("outpost_stores").delete().eq("id", id);

    if (error) {
      console.error("❌ 매장 삭제 실패:", error.message);
      alert("매장 삭제 실패");
    } else {
      alert("✅ 매장 삭제 완료");
      loadStores();
    }
    setIsProcessing(false);
  };

  const handleUpdateField = async (id, field, value) => {
    const { error } = await supabaseOutpost
      .from("outpost_stores")
      .update({ [field]: value })
      .eq("id", id);
    if (!error) loadStores();
  };

  return (
    <div className="admin-stores-page">
      <h1>OUTPOST 매장 관리</h1>

      <div className="store-form">
        <input
          type="text"
          name="name"
          placeholder="새 매장 이름 입력"
          value={newStore.name}
          onChange={handleChange}
          disabled={isProcessing}
        />
        <input
          type="text"
          name="type"
          placeholder="구분 (예: 본사, 직영, 위탁)"
          value={newStore.type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="상태 (예: 운영중, 보류)"
          value={newStore.status}
          onChange={handleChange}
        />
        <input
          type="text"
          name="memo"
          placeholder="메모"
          value={newStore.memo}
          onChange={handleChange}
        />
        <button onClick={handleAddStore} disabled={isProcessing}>
          ➕ 매장 추가
        </button>
      </div>

      <div className="store-list">
        {stores.length === 0 ? (
          <div className="no-results">등록된 매장이 없습니다.</div>
        ) : (
          stores.map((store) => (
            <div className="store-card" key={store.id}>
              <h2>{store.name}</h2>
              <p>등록일: {store.created_at?.slice(0, 10)}</p>
              <p>
                구분:{" "}
                <input
                  value={store.type || ""}
                  onChange={(e) => handleUpdateField(store.id, "type", e.target.value)}
                />
              </p>
              <p>
                상태:{" "}
                <input
                  value={store.status || ""}
                  onChange={(e) => handleUpdateField(store.id, "status", e.target.value)}
                />
              </p>
              <p>
                메모:{" "}
                <input
                  value={store.memo || ""}
                  onChange={(e) => handleUpdateField(store.id, "memo", e.target.value)}
                />
              </p>
              <div className="button-group">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteStore(store.id)}
                  disabled={isProcessing}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="back-button" onClick={() => navigate("/admin")}>
        ← 관리자 홈으로
      </button>
    </div>
  );
}
