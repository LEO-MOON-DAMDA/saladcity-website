import React from "react";
import { useNavigate } from "react-router-dom";
import MarketHeroSection from "../components/MarketHeroSection";
import MarketProductSlider from "../components/MarketProductSlider";
import MarketPhilosophySection from "../components/MarketPhilosophySection";
import MarketReviewHighlightSection from "../components/MarketReviewHighlightSection";
import MarketVIPNotice from "../components/MarketVIPNotice";
import MarketBrandVideoSection from "../components/MarketBrandVideoSection";
import MarketSocialGallery from "../components/MarketSocialGallery";

export default function MarketPage() {
  const navigate = useNavigate();

  return (
    <div className="market-page" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      <MarketHeroSection />

      {/* 상품 영역 */}
      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "60px 20px 20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", textAlign: "center", marginBottom: "40px", color: "#2f5130" }}>
          SALADCITY GOODS
        </h2>

        <MarketProductSlider />

        <div style={{ textAlign: "center", marginTop: "36px" }}>
<button className="brand-button" onClick={() => navigate("/shop")}>
  전체 상품 보기 →
</button>
        </div>
      </section>

      {/* WHY GOODS */}
      <section style={{ backgroundColor: "#fefdf7", padding: "80px 20px" }}>
        <MarketPhilosophySection />
      </section>

      {/* 감성 리뷰 */}
      <section style={{ backgroundColor: "#f6fdf9", padding: "80px 20px" }}>
        <MarketReviewHighlightSection />
      </section>

      {/* VIP + 브랜드영상 연결 */}
      <section style={{ backgroundColor: "#fdfcf8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <MarketVIPNotice />
          <div style={{ height: "40px" }} />
          <MarketBrandVideoSection />
        </div>
      </section>

      {/* 소셜 갤러리 */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 20px 100px" }}>
        <MarketSocialGallery />
      </section>
    </div>
  );
}
