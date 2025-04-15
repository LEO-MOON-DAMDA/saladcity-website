import React from "react";

export default function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <div className="menu-image-wrapper">
        <img src={item.image} alt={item.name} className="menu-image" />
      </div>
      <div className="menu-info">
        <h3>{item.name}</h3>
        <p className="summary">{item.summary}</p>
        <strong>{item.price.toLocaleString()}원</strong>
        <p className="nutrition">
          🥗 {item.kcal}kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2}
        </p>
      </div>
    </div>
  );
}
