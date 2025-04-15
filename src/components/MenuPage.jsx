import React from "react";
import menuItems from "../data/menuItems.json";
import MenuCard from "../components/MenuCard";
import "./MenuPage.css";

export default function MenuPage() {
  const groupedItems = menuItems.reduce((acc, item) => {
    const section = item.section || "기타";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      {Object.entries(groupedItems).map(([section, items]) => (
        <div key={section} className="menu-section">
          <h2 className="section-title">{section}</h2>
          <div className="horizontal-scroll-container">
            {items.map((item, index) => (
              <MenuCard key={index} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
