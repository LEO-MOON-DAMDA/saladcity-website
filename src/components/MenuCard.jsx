import React from "react";
import "./MenuCard.css";

export default function MenuCard({ item, onTagClick }) {
  const lowerName = item.name.toLowerCase();

  const allTags = [
    { key: "vegan", label: "Vegan 🥦", className: "badge-green" },
    { key: "vegetarian", label: "Vegetarian 🥕", className: "badge-orange" },
    { key: "flexitarian", label: "Flexitarian 🍽️", className: "badge-gray" },
    { key: "pollo", label: "Pollo 🍗", className: "badge-beige" },
    { key: "pesco", label: "Pesco 🐟", className: "badge-blue" },
  ];

  const tags = allTags.filter(tag => lowerName.includes(tag.key));

  return (
    <div className="scroll-card">
      <img src={item.image} alt={item.name} className="card-image" />

      <div className="card-content">
        <div className="card-badges">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`card-badge ${tag.className}`}
              onClick={() => onTagClick?.(tag.key)}
              style={{ cursor: "pointer" }}
            >
              {tag.label}
            </span>
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

        <div className="card-bottom">
          <p className="card-nutrition">
            {item.kcal ? `${item.kcal} kcal` : ""}
            {item.protein ? ` | 단백질 ${item.protein}g` : ""}
            {item.carbs ? ` | 탄수 ${item.carbs}g` : ""}
            {item.fat ? ` | 지방 ${item.fat}g` : ""}
            {item.co2 !== undefined ? ` | CO₂e ${parseFloat(item.co2).toFixed(1)}kg` : ""}
          </p>

          <p className="card-price">
            {item.price !== undefined ? `${item.price.toLocaleString()}\uc6d0` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
