import React from "react";
import "./MenuCard.css";

export default function MenuCard({ item }) {
  return (
    <div className="scroll-card">
      {/* 이미지 */}
      <img src={item.image} alt={item.name} className="card-image" />

      <div className="card-content">
        {/* 메뉴 이름 */}
        <h3 className="card-title">{item.name}</h3>

        {/* 설명 (description 또는 summary 사용) */}
        {(item.description || item.summary) && (
          <p className="card-description">
            {(item.description || item.summary).length > 40
              ? (item.description || item.summary).slice(0, 40) + "..."
              : (item.description || item.summary)}
          </p>
        )}

        {/* 재료 구성 (있을 경우에만) */}
        {item.ingredients && (
          <p className="card-ingredients">
            {item.ingredients.length > 40
              ? item.ingredients.slice(0, 40) + "..."
              : item.ingredients}
          </p>
        )}

        {/* 영양 정보 */}
        <p className="card-nutrition">
          {item.kcal ? `${item.kcal} kcal` : ""}
          {item.protein ? ` | 단백질 ${item.protein}g` : ""}
          {item.carbs ? ` | 탄수 ${item.carbs}g` : ""}
          {item.fat ? ` | 지방 ${item.fat}g` : ""}
          {item.co2 !== undefined
            ? ` | CO₂e ${parseFloat(item.co2).toFixed(1)}kg`
            : ""}
        </p>

        {/* 가격 */}
        <p className="card-price">
          {item.price !== undefined ? `${item.price.toLocaleString()}원` : ""}
        </p>
      </div>
    </div>
  );
}
