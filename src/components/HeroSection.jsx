import React from "react";
import BrandButton from "./BrandButton"; // ✅ BrandButton 가져오기

export default function HeroSection() {
  const scrollToMap = () => {
    const mapSection = document.querySelector(".map-section");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      style={{
        backgroundImage: 'url("https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/hero/hero-locations.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "140px 20px 100px",
        marginBottom: "2px",
        position: "relative",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* 상단 그라디언트 오버레이 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent)",
          zIndex: 1,
        }}
      />
      {/* 콘텐츠 영역 */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "10px",
            lineHeight: 1.4,
          }}
        >
          샐러드시티가 있는 곳엔<br />자연이 있습니다.
        </h1>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: 1.5,
          }}
        >
          서울 곳곳, 그리고 초록 들녘까지<br />우리는 매일 당신 곁에 있습니다.
        </p>
        <p
          style={{
            fontSize: "15px",
            fontWeight: "300",
            marginTop: "12px",
            color: "#ddd",
          }}
        >
          From seed to city, 샐러드시티는 오늘도 자랍니다.
        </p>

        {/* ✅ BrandButton 적용 */}
        <div style={{ marginTop: "28px" }}>
          <BrandButton onClick={scrollToMap}>
            지도에서 매장 보기 →
          </BrandButton>
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "32px",
            animation: "bounce 1.8s infinite",
          }}
        >
          ↓
        </div>
      </div>
    </section>
  );
}
