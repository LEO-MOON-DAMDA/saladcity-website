import React from "react";
import "./MenuCard.css";

export default function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} className="menu-image" />
      <div className="menu-content">
        <h3 className="menu-name">{item.name}</h3>
        <p className="menu-description">{item.description}</p>
        <p className="menu-price">{item.price.toLocaleString()}원</p>
        <p className="menu-nutrition">
          {item.kcal}kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2}kg
        </p>
      </div>
    </div>
  );
}
