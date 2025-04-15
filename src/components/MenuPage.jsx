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
      {Object.entries(groupedItems).map(([section, items]) => (
        <MenuSectionSlider key={section} title={section} items={items} />
      ))}
    </div>
  );
}
