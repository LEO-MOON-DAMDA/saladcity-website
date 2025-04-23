import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MarketGoodsAdmin() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    fetchGoods();
  }, [showDeleted]);

  const fetchGoods = async () => {
    setLoading(true);
    const query = supabase.from("market_goods").select("*").order("created_at", { ascending: false });
    const { data, error } = showDeleted
      ? await query
      : await query.eq("is_deleted", false);
    if (error) {
      setStatus("❌ 불러오기 실패: " + error.message);
    } else {
      setGoods(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase
      .from("market_goods")
      .update({ is_deleted: true })
      .eq("id", id);
    if (error) {
      setStatus("❌ 삭제 실패: " + error.message);
    } else {
      setStatus("✅ 삭제 완료");
      fetchGoods();
    }
  };

  const handleRestore = async (id) => {
    const { error } = await supabase
      .from("market_goods")
      .update({ is_deleted: false })
      .eq("id", id);
    if (error) {
      setStatus("❌ 복구 실패: " + error.message);
    } else {
      setStatus("✅ 복구 완료");
      fetchGoods();
    }
  };

  const handleUpdate = async (id, field, value) => {
    const { error } = await supabase
      .from("market_goods")
      .update({ [field]: value })
      .eq("id", id);
    if (error) {
      setStatus("❌ 수정 실패: " + error.message);
    } else {
      setStatus("✅ 수정 완료");
      fetchGoods();
    }
  };

  const filteredGoods = goods.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = goods.length;
  const avgPrice = total > 0 ? Math.round(goods.reduce((sum, g) => sum + g.price, 0) / total) : 0;
  const totalStock = goods.reduce((sum, g) => sum + (g.stock || 0), 0);

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>굿즈 전체 리스트</h2>

      {/* 통계 영역 */}
      <div style={{ display: "flex", justifyContent: "space-between", background: "#f0fdf4", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px", color: "#2f855a" }}>
        <div>총 {total}개 등록</div>
        <div>평균 가격: {avgPrice.toLocaleString()}원</div>
        <div>총 재고: {totalStock}개</div>
      </div>

      {/* 검색창 + 숨김 보기 토글 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="상품명 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 12px", width: "80%", border: "1px solid #ddd", borderRadius: "6px" }}
        />
        <label style={{ fontSize: "13px" }}>
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
            style={{ marginLeft: "12px", marginRight: "6px" }}
          />
          숨김 포함 보기
        </label>
      </div>

      {status && <p style={{ marginBottom: 16, color: status.startsWith("✅") ? "green" : "red" }}>{status}</p>}

      {loading ? (
        <p>⏳ 불러오는 중...</p>
      ) : filteredGoods.length === 0 ? (
        <p>등록된 굿즈가 없습니다.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {filteredGoods.map((item) => (
            <div key={item.id} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "12px", backgroundColor: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
              <img src={item.image_main} alt={item.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
              <input
                defaultValue={item.name}
                onBlur={(e) => handleUpdate(item.id, "name", e.target.value)}
                style={{ fontWeight: "bold", fontSize: "15px", margin: "6px 0", width: "100%", border: "none", borderBottom: "1px solid #ccc" }}
              />
              <textarea
                defaultValue={item.description}
                onBlur={(e) => handleUpdate(item.id, "description", e.target.value)}
                rows={2}
                style={{ fontSize: "13px", width: "100%", marginBottom: "6px", border: "none", borderBottom: "1px solid #ccc" }}
              />
              <input
                defaultValue={item.price}
                type="number"
                onBlur={(e) => handleUpdate(item.id, "price", parseInt(e.target.value))}
                style={{ fontSize: "14px", color: item.stock < 10 ? "#e53e3e" : "#2f855a", fontWeight: "bold", width: "100%", border: "none", borderBottom: "1px solid #ccc" }}
              />원
              <div style={{ marginTop: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "13px", color: item.stock < 10 ? "#e53e3e" : "#333" }}>
                  재고: {item.stock}
                  {item.is_deleted && <span style={{ marginLeft: "6px", color: "#e53e3e", fontWeight: "bold" }}> (숨김됨)</span>}
                </div>
                {item.is_deleted ? (
                  <button onClick={() => handleRestore(item.id)} style={{ backgroundColor: "#319795", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 10px", fontSize: "12px", cursor: "pointer" }}>
                    복구
                  </button>
                ) : (
                  <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: "#e53e3e", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 10px", fontSize: "12px", cursor: "pointer" }}>
                    삭제
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
