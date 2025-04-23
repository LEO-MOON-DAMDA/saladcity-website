import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MarketGoodsAdmin() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchGoods();
  }, []);

  const fetchGoods = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("market_goods").select("*").order("created_at", { ascending: false });
    if (error) {
      setStatus("❌ 불러오기 실패: " + error.message);
    } else {
      setGoods(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("market_goods").delete().eq("id", id);
    if (error) {
      setStatus("❌ 삭제 실패: " + error.message);
    } else {
      setStatus("✅ 삭제 완료");
      fetchGoods();
    }
  };

  return (
    <div style={{ maxWidth: "960px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>굿즈 전체 리스트</h2>
      {status && <p style={{ textAlign: "center", marginBottom: 12 }}>{status}</p>}
      {loading ? (
        <p>⏳ 불러오는 중...</p>
      ) : goods.length === 0 ? (
        <p>등록된 굿즈가 없습니다.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {goods.map((item) => (
            <div key={item.id} style={{
              border: "1px solid #ddd", borderRadius: "12px", padding: "12px", backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <img src={item.image_main} alt={item.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
              <h3 style={{ marginTop: "10px", fontSize: "16px", color: "#2f5130" }}>{item.name}</h3>
              <p style={{ fontSize: "14px", color: "#666" }}>{item.description}</p>
              <p style={{ fontSize: "15px", fontWeight: "bold", color: "#2f855a" }}>{item.price.toLocaleString()}원</p>
              <button onClick={() => handleDelete(item.id)} style={{
                marginTop: "10px", padding: "8px 12px", fontSize: "13px",
                backgroundColor: "#e53e3e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer"
              }}>
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
