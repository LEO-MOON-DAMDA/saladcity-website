import React from "react";
import menuItems from "../data/menuItems.json";
import MenuSectionSlider from "./MenuSectionSlider";
import "./MenuPage.css";

export default function MenuPage() {
  const groupedItems = menuItems.reduce((acc, item) => {
    const section = item.category || "기타";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      {/* Signature 이미지 섹션 */}
      <section className="signature-banner">
        <div className="overlay-text">
          <h1>Chef’s Favorite</h1>
          <p>샐러드시티의 시그니처 메뉴, 정성 가득한 한 접시</p>
        </div>
        <img src="/images/salad/salcy_menu01.png" alt="Signature Menu" />
      </section>

      {/* 브랜드 인물 영감 섹션 */}
      <section className="inspiration-hero">
        <img src="/images/salad/salcy_menu02.png" alt="Brand Inspiration" />
        <div className="caption">
          <h2>Our People</h2>
          <p>샐러드시티를 만드는 사람들의 이야기</p>
        </div>
      </section>

      {/* 브랜드 아트워크 섹션 */}
      <section className="art-board">
        <img src="/images/salad/salcy_menu03.png" alt="Mood Art" />
        <div className="caption">
          <h2>Organic Energy</h2>
          <p>브랜드를 감싸는 예술적 감성</p>
        </div>
      </section>

      {/* 메뉴 슬라이더 섹션 */}
      {Object.entries(groupedItems).map(([section, items]) => (
        <MenuSectionSlider key={section} title={section} items={items} />
      ))}
    </div>
  );
}
