import React from "react";
import "./MenuSlider.css"; // ✅ MenuSlider.css 안에 스타일 통합되어 있어야 함

const allTags = [
  { key: "vegan", label: "Vegan 🥦", className: "badge-green" },
  { key: "vegetarian", label: "Vegetarian 🥕", className: "badge-orange" },
  { key: "ovovegetarian", label: "Ovo Vegetarian 🥚", className: "badge-yellow" },
  { key: "flexitarian", label: "Flexitarian 🍽️", className: "badge-gray" },
  { key: "pollo", label: "Pollo 🍗", className: "badge-beige" },
  { key: "pesco", label: "Pesco 🐟", className: "badge-blue" },
];

export default function MenuCard({ item, onTagClick, selectedTags = [] }) {
  const typeAlias = {
    "ovovegetarian": "ovovegetarian",
    "pesco": "pesco",
    "pollo": "pollo",
    "vegan": "vegan",
    "flexitarian": "flexitarian",
  };

  const normalizedType = item.type
    ? item.type.toLowerCase().replace(/\s/g, "")
    : null;

  const mappedType = normalizedType ? typeAlias[normalizedType] : null;

  const tagInfo = mappedType
    ? allTags.find((t) => t.key === mappedType)
    : null;

  return (
    <div className="scroll-card">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/fallback.webp";
          }}
        />
      )}

      <div className="card-text">
        {tagInfo && (
          <div className="card-badges">
            <span
              className={`card-badge ${tagInfo.className}`}
              onClick={() => onTagClick?.(tagInfo.key.toLowerCase())}
            >
              {tagInfo.label}
            </span>
          </div>
        )}

        <h3>{item.name}</h3>

        {(item.description || item.summary) && (
          <p>
            {(item.description || item.summary).length > 40
              ? (item.description || item.summary).slice(0, 40) + "..."
              : item.description || item.summary}
          </p>
        )}

        {item.kcal && (
          <p className="card-nutrition">
            {`${item.kcal}kcal`}
            {item.protein ? ` | 단백질 ${item.protein}g` : ""}
            {item.carbs ? ` | 탄수 ${item.carbs}g` : ""}
            {item.fat ? ` | 지방 ${item.fat}g` : ""}
          </p>
        )}

        <p className="card-price">
          {item.price !== undefined ? `${item.price.toLocaleString()}원` : ""}
        </p>
      </div>
    </div>
  );
}
