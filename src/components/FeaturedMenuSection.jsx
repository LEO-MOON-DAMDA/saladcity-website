// src/components/FeaturedMenuSection.jsx
import React from "react";
import FeaturedMenuCard from "./FeaturedMenuCard";
import "./FeaturedMenuSection.css";

export default function FeaturedMenuSection({ items }) {
  return (
    <section className="featured-menu-section">
      <h2 className="featured-title">샐러드시티 추천메뉴</h2>
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
