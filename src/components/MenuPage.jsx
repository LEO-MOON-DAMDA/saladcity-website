import React from "react";
import menuData from "../data/menuItems.json";
import Header from "./Header";
import "./MenuPage.css"; // 아래에 CSS 코드도 포함되어 있음

export default function MenuPage() {
  const categories = [...new Set(menuData.map(item => item["카테고리"]))];

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#f6fdf8", paddingTop: "80px" }}>
      <Header />

      {categories.map((category, idx) => {
        const items = menuData.filter(item => item["카테고리"] === category);
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
                <div key={i} className="menu-card">
                  <div className="menu-image-wrapper">
                    <img
                      src={item["이미지경로"]}
                      alt={item["메뉴명"]}
                      className="menu-image"
                    />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>{item["메뉴명"]}</h3>
                    <p style={{ fontSize: "14px", color: "#666", margin: "0 0 8px" }}>{item["설명"]}</p>
                    <strong>{item["Price"]}원</strong>
                    <p style={{ fontSize: "13px", color: "#888", marginTop: "8px" }}>
                      🥗 {item["칼로리"]} kcal | P {item["단백질"]}g | C {item["탄수화물"]}g | F {item["지방"]}g
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
