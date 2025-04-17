import React from "react";
import FeaturedMenuCard from "./FeaturedMenuCard";
import BrandButton from "./BrandButton";
import "./FeaturedMenuSection.css";

export default function FeaturedMenuSection({ items }) {
  if (!items || items.length === 0) {
    return (
      <section className="featured-menu-section">
        <h2 className="featured-title">추천메뉴를 불러오는 중입니다...</h2>
      </section>
    );
  }

  return (
    <section className="featured-menu-section">
      <div className="featured-slider-wrapper">
        <div className="featured-slider-scroll">
          {items.map((item, idx) => (
            <FeaturedMenuCard key={idx} item={item} />
          ))}
        </div>
      </div>
      <div className="featured-menu-cta">
        <BrandButton onClick={() => window.print()}>📄 메뉴 프린트하기</BrandButton>
      </div>
    </section>
  );
}
