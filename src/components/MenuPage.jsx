// src/components/MenuPage.jsx
import React from "react";
import menuData from "../data/menuItems.json";
import Header from "./Header";
import MenuCard from "./MenuCard";
import "./MenuPage.css"; // 스타일은 여기에 따로 관리

export default function MenuPage() {
  const categories = [...new Set(menuData.map(item => item.category))];

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#f6fdf8", paddingTop: "80px" }}>
      <Header />

      {categories.map((category, idx) => {
        const items = menuData.filter(item => item.category === category);
        return (
          <section key={idx} style={{ marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "26px",
              marginBottom: "16px",
              color: "#2f5d3c",
              textAlign: "center"
            }}>
              {category}
            </h2>
            <div className="horizontal-scroll-container">
              {items.map((item, i) => (
                <MenuCard key={i} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
