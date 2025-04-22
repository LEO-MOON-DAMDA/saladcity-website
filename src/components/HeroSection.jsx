// ✅ src/components/HeroSection.jsx
import React from "react";
import "../styles/HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-image">
        <img src="/images/hero/saladcity-hero01.jpg" alt="샐러드시티 감성" />
        <div className="hero-overlay">
          <h1 className="hero-title">샐러드시티가 있는 곳엔<br />자연이 있습니다.</h1>
          <p className="hero-sub">서울 곳곳, 그리고 초록 들녘까지<br />우리는 매일 당신 곁에 있습니다.</p>
          <div className="scroll-down">↓</div>
        </div>
      </div>
    </section>
  );
}
