import React from "react";
import "./MenuCard.css";

export default function MenuCard({ item }) {
  return (
    <div className="scroll-card">
      <img src={item.image} alt={item.name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>

        <p className="card-description">
          {item.description?.length > 40 ? item.description.slice(0, 40) + "..." : item.description}
        </p>

        <p className="card-ingredients">
          {item.ingredients?.length > 40 ? item.ingredients.slice(0, 40) + "..." : item.ingredients}
        </p>

        <p className="card-nutrition">
          {item.calories && `${item.calories} kcal`}{" "}
          {item.protein && `| 단백질 ${item.protein}g`}{" "}
          {item.carbs && `| 탄수 ${item.carbs}g`}{" "}
          {item.fat && `| 지방 ${item.fat}g`}{" "}
          {item.co2 !== undefined && `| CO₂e ${parseFloat(item.co2).toFixed(1)}kg`}
        </p>

        <p className="card-price">{item.price?.toLocaleString()}원</p>
      </div>
    </div>
  );
}
