import React from "react";
import "./MenuSlider.css";

export default function MenuCard({ item, onTagClick, selectedTags = [] }) {
  const lowerName = item.name.toLowerCase();

  const allTags = [
    { key: "vegan", label: "Vegan 🥦", className: "badge-green" },
    { key: "vegetarian", label: "Vegetarian 🥕", className: "badge-orange" },
    { key: "flexitarian", label: "Flexitarian 🍽️", className: "badge-gray" },
    { key: "pollo", label: "Pollo 🍗", className: "badge-beige" },
    { key: "pesco", label: "Pesco 🐟", className: "badge-blue" },
  ];

  const tags = allTags.filter((tag) => lowerName.includes(tag.key));

  const dressingMap = {
    "greek": "greek.webp",
    "balsamic": "balsamic.webp",
    "oriental_premade": "oriental_premade.webp",
    "sriracha_mayo": "sriracha_mayo.webp",
    "orange": "orange.webp",
    "oriental": "oriental.webp",
    "italian": "italian.webp",
    "caesar": "caesar.webp"
  };

  const dressingSource = `${item.name}${item.summary || ""}${item.description || ""}${item.dressing || ""}`.toLowerCase();
  const matchedKey = Object.keys(dressingMap).find((key) => dressingSource.includes(key));
  const dressingImg = matchedKey
    ? `https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/${dressingMap[matchedKey]}`
    : null;

  return (
    <div className="scroll-card">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="card-image"
          loading="lazy" // ✅ lazy loading
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/fallback.webp";
          }}
        />
      )}

      <div className="card-text">
        <div className="card-badges">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`card-badge ${tag.className} ${selectedTags.includes(tag.key) ? "selected" : ""}`}
              onClick={() => onTagClick?.(tag.key)}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <h3>{item.name}</h3>

        {(item.description || item.summary) && (
          <p>
            {(item.description || item.summary).length > 40
              ? (item.description || item.summary).slice(0, 40) + "..."
              : item.description || item.summary}
          </p>
        )}

        {item.ingredients && (
          <p className="card-ingredients">
            {item.ingredients.length > 40
              ? item.ingredients.slice(0, 40) + "..."
              : item.ingredients}
          </p>
        )}

        {item.category !== "DRESSING" && dressingImg && (
          <div className="card-dressing">
            <img
              src={dressingImg}
              alt="드레싱"
              loading="lazy"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
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
            {item.price !== undefined ? `${item.price.toLocaleString()}원` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
