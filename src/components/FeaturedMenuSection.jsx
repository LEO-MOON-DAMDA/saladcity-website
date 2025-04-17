import React from "react";
import SectionTitle from "./SectionTitle";
import FeaturedMenuCard from "./FeaturedMenuCard";
import BrandButton from "./BrandButton";
import "./FeaturedMenuSection.css";

export default function FeaturedMenuSection({ items }) {
  if (!items || items.length === 0) {
    return (
      <section className="featured-menu-section">
        <SectionTitle style={{ textAlign: "center" }}>
          샐러드시티 추천메뉴
        </SectionTitle>
        <p className="featured-loading">추천메뉴를 불러오는 중입니다...</p>
      </section>
    );
  }

  return (
    <section className="featured-menu-section">
      <SectionTitle style={{ textAlign: "center" }}>
        샐러드시티 추천메뉴
      </SectionTitle>

      <div className="featured-slider-wrapper">
        <div className="featured-slider-scroll">
          {items.map((item, idx) => (
            <FeaturedMenuCard key={idx} item={item} />
          ))}
        </div>
      </div>

      <div className="featured-menu-cta">
        <BrandButton onClick={() => window.print()}>
          📄 메뉴 프린트하기
        </BrandButton>
      </div>
    </section>
  );
}
