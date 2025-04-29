// ✅ 파일 경로: /src/components/MarketHeroSection.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../styles/MarketHeroSection.css";

export default function MarketHeroSection() {
  return (
    <section className="market-hero">
      <video
        className="market-hero-video"
        src="/videos/saladcity-market-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="market-hero-overlay">
        <h1 className="market-hero-title">당신의 하루에 감정을 더합니다</h1>
        <p className="market-hero-sub">샐러드시티는 삶의 온기를 굿즈로 담아내는 브랜드입니다.</p>
	<Link
  to="/shop"
  className="market-hero-button"
  	style={{
  	  backgroundColor: "#f1c40f", // ✅ 색상 유지
  	  color: "#222",
  	  padding: "16px 28px", // ✅ BrandButton 스타일
  	  fontSize: "16px",
   	 fontWeight: "600",
  	  fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
  	  border: "none",
  	  borderRadius: "32px", // ✅ BrandButton radius
  	  textDecoration: "none",
  	  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", // ✅ 부드러운 그림자 추가
  	  transition: "all 0.2s ease-in-out",
 	 }}
 	 onMouseEnter={(e) => {
 	   e.target.style.backgroundColor = "#d4ac0d";
 	   e.target.style.color = "#fff";
 	 }}
 	 onMouseLeave={(e) => {
 	   e.target.style.backgroundColor = "#f1c40f";
 	   e.target.style.color = "#222";
 	 }}
	>
	  감성 쇼핑하러 가기 →
	</Link>

      </div>
    </section>
  );
}
