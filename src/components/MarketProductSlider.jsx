// ✅ /src/components/MarketProductSlider.jsx (제목 제거 + 상품 없을 때 메시지 포함)
import React, { useEffect, useState } from "react";
import { loadGoodsFromSupabase } from "../utils/loadGoodsFromSupabase";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/MarketProductSlider.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

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

  const handleCheckout = async (priceId, isSubscription) => {
    const stripe = await stripePromise;
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, isSubscription }),
    });

    const session = await res.json();
    if (session?.id) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      alert("❌ 결제 세션 생성 실패");
    }
  };

  return (
    <div className="market-slider">
      {goods.length === 0 ? (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: "#999",
            fontSize: "15px",
            padding: "40px 0",
          }}
        >
          🕐 상품을 준비 중입니다. 곧 만나보실 수 있어요!
        </div>
      ) : (
        goods.map((product) => (
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
              {product.stripePriceId ? (
                <button
                  className="buy-button"
                  onClick={() =>
                    handleCheckout(product.stripePriceId, product.isSubscription)
                  }
                >
                  {product.isSubscription ? "구독하기" : "구매하기"}
                </button>
              ) : (
                <p style={{ color: "#999", fontSize: "13px" }}>결제 준비 중</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
