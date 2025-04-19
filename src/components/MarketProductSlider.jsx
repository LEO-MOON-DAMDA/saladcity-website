import React, { useEffect, useState } from "react";
import { loadGoodsFromSupabase } from "../utils/loadGoodsFromSupabase";
import { loadStripe } from "@stripe/stripe-js";
import "./MarketProductSlider.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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
        ))}
      </div>
    </section>
  );
}
