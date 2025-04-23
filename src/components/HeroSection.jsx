import React from "react";
import "../styles/HeroSection.css"; // 기존 유지

export default function HeroSection() {
  return (
    <section className="hero-locations with-bg">
      <div className="hero-text">
        <h1>샐러드시티가 있는 곳엔<br />자연이 있습니다.</h1>
        <p>서울 곳곳, 그리고 초록 들녘까지<br />우리는 매일 당신 곁에 있습니다.</p>
        <div className="scroll-down">↓</div>
      </div>
    </section>
  );
}
