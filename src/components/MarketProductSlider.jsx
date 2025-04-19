import React, { useEffect, useState } from "react";
import { loadGoodsFromSupabase } from "../utils/loadGoodsFromSupabase";
import "./MarketProductSlider.css";

export default function MarketProductSlider() {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await loadGoodsFromSupabase();
        setGoods(data);
      } catch (err) {
        console.error("❌ 상품 불러오기 실패:", err.message);
      }
    };
    fetchGoods();
  }, []);

  return (
    <section className="market-slider-section">
      <h2 className="market-slider-title">SALCY GOODS</h2>
      <div className="market-slider">
        {goods.map((product) => (
          <div key={product.id} className="market-slide-card">
            <div className="product-image-wrapper">
              <img src={product.mainImage} alt={product.name} />
              {product.isSubscription && (
                <span className="product-label">SUBSCRIPTION</span>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">
                {product.price
                  ? `₩${Number(product.price).toLocaleString()}`
                  : "문의"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
