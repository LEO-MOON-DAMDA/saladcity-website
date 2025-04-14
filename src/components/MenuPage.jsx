
// src/components/MenuPage.jsx
import React from "react";
import menuItems from "../data/menuItems.json";
import MenuCard from "./MenuCard";

export default function MenuPage() {
  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div style={{ padding: '60px 24px' }}>
      {categories.map(category => (
        <div key={category} style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '24px', color: '#275f3a' }}>{category}</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'flex-start'
          }}>
            {menuItems
              .filter(item => item.category === category)
              .map((item, index) => (
                <MenuCard key={index} item={item} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
