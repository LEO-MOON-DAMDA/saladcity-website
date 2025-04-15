
// src/components/MenuPage.jsx
import React from "react";
import Header from "./components/Header"; // ✅ 추가
import menuData from "../data/menuItems.json";

export default function MenuPage() {
  const categories = [...new Set(menuData.map(item => item["카테고리"]))];

  return (
    <div style={{ padding: "80px 24px", backgroundColor: "#f6fdf8", fontFamily: "sans-serif" }}>
      {categories.map((category, idx) => {
        const items = menuData.filter(item => item["카테고리"] === category);
        return (
          <section key={idx} style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "26px", marginBottom: "20px", color: "#2f5d3c", textAlign: "center" }}>
              {category}
            </h2>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "32px",
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              {items.map((item, i) => (
                <div key={i} style={{
                  width: "280px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.07)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer"
                }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ width: "100%", height: "230px", overflow: "hidden" }}>
                    <img
                      src={item["이미지경로"]}
                      alt={item["메뉴명"]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        transform: "scale(1.6)",
                        transition: "transform 0.3s ease"
                      }}
                    />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>{item["메뉴명"]}</h3>
                    <p style={{ fontSize: "14px", color: "#666", margin: "0 0 8px" }}>{item["요약설명"]}</p>
                    <strong>{item["Price"]}원</strong>
                    <p style={{ fontSize: "13px", color: "#888", marginTop: "8px" }}>
                      🥗 {item["칼로리"]} kcal | P {item["단백질"]}g | C {item["탄수화물"]}g | F {item["지방"]}g | CO₂e {item["환경지표"]}kg
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
