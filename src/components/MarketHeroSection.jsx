import React from "react";
import "./MarketHeroSection.css";

export default function MarketHeroSection() {
  return (
    <section className="market-hero">
      <div className="market-hero-background">
        <img
          src="/images/market/hero_bg.jpg"
          alt="The Market"
          className="market-hero-image"
        />
        <div className="market-hero-overlay" />
      </div>
      <div className="market-hero-text">
        <h1>SALCY THE MARKET</h1>
        <p>
          우리는 단순히 굿즈를 만들지 않습니다.  
          <br />
          SALCY의 하루, 철학, 감각을 담았습니다.
        </p>
        <button className="market-hero-button">
          🎁 감성을 만나보세요 →
        </button>
      </div>
    </section>
  );
}
