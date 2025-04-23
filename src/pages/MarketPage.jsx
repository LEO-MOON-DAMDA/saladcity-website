import React from "react";
import MarketHeroSection from "../components/MarketHeroSection";
import MarketProductSlider from "../components/MarketProductSlider";
import MarketPhilosophy from "../components/MarketPhilosophy";
import MarketVIPNotice from "../components/MarketVIPNotice";
import MarketSocialGallery from "../components/MarketSocialGallery";
import { useNavigate } from "react-router-dom";

export default function MarketPage() {
  const navigate = useNavigate();

  return (
    <div className="market-page" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      <MarketHeroSection />

      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "60px 20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 600, textAlign: "center", marginBottom: "32px", color: "#2f5130" }}>
          SALADCITY GOODS
        </h2>
        <MarketProductSlider />

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            onClick={() => navigate("/shop")}
            style={{
              backgroundColor: "#2f855a",
              color: "white",
              padding: "12px 28px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            전체 상품 보기 →
          </button>
        </div>
      </section>

      <MarketPhilosophy />
      <MarketVIPNotice />
      <MarketSocialGallery />
    </div>
  );
}
