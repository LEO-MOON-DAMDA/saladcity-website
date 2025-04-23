import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import MarketBrandVideoSection from "../components/MarketBrandVideoSection";
import "../styles/Shop.css";

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
          .select("id, name, price, image_main, description")
          .eq("is_deleted", false)
          .order("created_at", { ascending: false });

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
    <div className="shop-page">
      <h1 className="shop-title">SALADCITY 전체 굿즈</h1>

      <input
        type="text"
        className="shop-search"
        placeholder="상품명 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <MarketBrandVideoSection />

      {loading && <p className="shop-loading">⏳ 로딩 중...</p>}

      {!loading && filtered.length === 0 && (
        <p className="shop-empty">등록된 상품이 없습니다.</p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="shop-grid">
          {filtered.map((item) => (
            <div key={item.id} className="shop-card">
              <img src={item.image_main} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="shop-description">{item.description}</p>
              <p className="shop-price">{item.price.toLocaleString()}원</p>
              <button className="add-to-cart" onClick={() => handleAddToCart(item)}>
                장바구니 담기
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
