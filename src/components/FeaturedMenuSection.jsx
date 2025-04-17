// src/components/FeaturedMenuSection.jsx
import React from "react";
import FeaturedMenuCard from "./FeaturedMenuCard";
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
      {/* 제목 제거됨 */}
      <div className="featured-slider-wrapper">
        <div className="featured-slider-scroll">
          {items.map((item, idx) => (
            <FeaturedMenuCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
