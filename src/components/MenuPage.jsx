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

      {/* 📸 시네마틱 주방 배경 */}
      <div className="menu-background">
        <img src="/images/salad/salcy_menu04.png" alt="kitchen background" />
      </div>

      {/* 🧾 메뉴 콘텐츠 */}
      <div className="menu-content">
        {Object.entries(groupedItems).map(([section, items]) => (
          <MenuSectionSlider key={section} title={section} items={items} />
        ))}
      </div>

    </div>
  );
}
