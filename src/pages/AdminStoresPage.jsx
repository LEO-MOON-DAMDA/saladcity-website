// src/pages/AdminStoresPage.jsx
import React, { useState, useEffect } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import { useNavigate } from "react-router-dom";
import "./AdminStoresPage.css";

export default function AdminStoresPage() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [newStoreName, setNewStoreName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleAddStore = async () => {
    if (!newStoreName.trim()) {
      alert("매장 이름을 입력하세요.");
      return;
    }
    setIsProcessing(true);
    const { error } = await supabaseOutpost
      .from("outpost_stores")
      .insert([{ name: newStoreName }]);

    if (error) {
      console.error("❌ 매장 추가 실패:", error.message);
      alert("매장 추가 실패");
    } else {
      alert("✅ 매장 추가 완료");
      setNewStoreName("");
      loadStores();
    }
    setIsProcessing(false);
  };

  const handleDeleteStore = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setIsProcessing(true);
    const { error } = await supabaseOutpost
      .from("outpost_stores")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ 매장 삭제 실패:", error.message);
      alert("매장 삭제 실패");
    } else {
      alert("✅ 매장 삭제 완료");
      loadStores();
    }
    setIsProcessing(false);
  };

  return (
    <div className="admin-stores-page">
      <h1>OUTPOST 매장 관리</h1>

      <div className="store-form">
        <input
          type="text"
          placeholder="새 매장 이름 입력"
          value={newStoreName}
          onChange={(e) => setNewStoreName(e.target.value)}
          disabled={isProcessing}
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
