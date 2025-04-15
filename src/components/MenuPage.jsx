import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import menuItems from "../data/menuItems.json";
import MenuSectionSlider from "./MenuSectionSlider";
import "./MenuPage.css";

export default function MenuPage() {
  const location = useLocation();

  // ✅ 해시(#카테고리명) 이동 처리
  useEffect(() => {
    if (location.hash) {
      const sectionId = decodeURIComponent(location.hash.replace("#", ""));
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // 렌더링 보장용 딜레이
      }
    }
  }, [location]);

  // ✅ 카테고리별 메뉴 그룹핑
  const groupedItems = menuItems.reduce((acc, item) => {
    const section = item.category || "기타";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      {/* 📸 시네마틱 배경 */}
      <div className="menu-background">
        <img src="/images/salad/salcy_menu04.png" alt="kitchen background" />
      </div>

      {/* 🧾 메뉴 콘텐츠 */}
      <div className="menu-content">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} id={section}>
            <MenuSectionSlider title={section} items={items} />
          </div>
        ))}
      </div>
    </div>
  );
}
