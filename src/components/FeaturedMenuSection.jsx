
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

      <div className="featured-slider-wrapper" style={{ overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", padding: "8px 0 8px 16px" }}>
        <div style={{
          display: "flex",
          gap: "16px",
          paddingRight: "24px",
          width: "fit-content",
        }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                scrollSnapAlign: "start",
                flex: "0 0 auto",
                width: "65vw",
                maxWidth: "320px",
              }}
            >
              <FeaturedMenuCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="featured-menu-cta" style={{ textAlign: "center", marginTop: "24px" }}>
        <BrandButton onClick={() => window.print()}>
          📄 메뉴 프린트하기
        </BrandButton>
      </div>
    </section>
  );
}
