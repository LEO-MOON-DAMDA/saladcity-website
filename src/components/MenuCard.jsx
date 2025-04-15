import React from "react";
import "./MenuCard.css";

export default function MenuCard({ item }) {
  // 태그 자동 감지 (예: Vegan, Flexitarian, Pollo 등)
  const tags = [];
  const lowerName = item.name.toLowerCase();
  if (lowerName.includes("vegan")) tags.push("Vegan");
  if (lowerName.includes("vegetarian")) tags.push("Vegetarian");
  if (lowerName.includes("flexitarian")) tags.push("Flexitarian");
  if (lowerName.includes("pollo")) tags.push("Pollo");
  if (lowerName.includes("pesco")) tags.push("Pesco");

  return (
    <div className="scroll-card">
      <img src={item.image} alt={item.name} className="card-image" />

      <div className="card-content">
        {/* ✅ 태그 뱃지 (상단에 출력) */}
        <div className="card-badges">
          {tags.map((tag, idx) => (
            <span key={idx} className="card-badge">{tag}</span>
          ))}
        </div>

        <h3 className="card-title">{item.name}</h3>

        {(item.description || item.summary) && (
          <p className="card-description">
            {(item.description || item.summary).length > 40
              ? (item.description || item.summary).slice(0, 40) + "..."
              : (item.description || item.summary)}
          </p>
        )}

        {item.ingredients && (
          <p className="card-ingredients">
            {item.ingredients.length > 40
              ? item.ingredients.slice(0, 40) + "..."
              : item.ingredients}
          </p>
        )}

        <p className="card-nutrition">
          {item.kcal ? `${item.kcal} kcal` : ""}
          {item.protein ? ` | 단백질 ${item.protein}g` : ""}
          {item.carbs ? ` | 탄수 ${item.carbs}g` : ""}
          {item.fat ? ` | 지방 ${item.fat}g` : ""}
          {item.co2 !== undefined
            ? ` | CO₂e ${parseFloat(item.co2).toFixed(1)}kg`
            : ""}
        </p>

        <p className="card-price">
          {item.price !== undefined ? `${item.price.toLocaleString()}원` : ""}
        </p>
      </div>
    </div>
  );
}
