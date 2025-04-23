import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import MarketBrandVideoSection from "../components/MarketBrandVideoSection";

export default function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const { data, error } = await supabase
          .from("market_goods")
          .select("*")
          .eq("is_deleted", false)
          .order("created_at", { ascending: false });

        console.log("Supabase 응답:", { data, error });

        if (error) {
          console.error("❌ 굿즈 불러오기 실패:", error.message);
        } else {
          setGoods(data || []);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGoods();
  }, []);

  const filtered = goods.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast("장바구니에 담겼어요!");
    setTimeout(() => navigate("/cart"), 1500);
  };

  return (
    <div style={{ maxWidth: "1080px", margin: "40px auto", padding: "0 16px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>굿즈 쇼핑하기</h2>

      <input
        type="text"
        placeholder="상품명 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px 12px", width: "100%", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "24px" }}
      />

      <MarketBrandVideoSection />

      {loading && <p>⏳ 로딩 중...</p>}

      {!loading && filtered.length === 0 && (
        <p>등록된 상품이 없습니다.</p>
      )}

      {!loading && filtered.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ border: "1px solid #eee", borderRadius: "12px", padding: "12px", background: "#fff" }}>
              <img
                src={item.image_main}
                alt={item.name}
                style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
              />
              <h3 style={{ fontSize: "16px", margin: "8px 0 4px" }}>{item.name}</h3>
              <p style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>{item.description}</p>
              <p style={{ fontWeight: "bold", fontSize: "15px", color: "#2f855a" }}>{item.price.toLocaleString()}원</p>
              <button
                onClick={() => handleAddToCart(item)}
                style={{ marginTop: "8px", width: "100%", padding: "10px", backgroundColor: "#2f855a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                장바구니 담기
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
