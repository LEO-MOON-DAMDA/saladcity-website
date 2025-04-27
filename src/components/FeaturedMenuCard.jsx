import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedMenuCard.css";

export default function FeaturedMenuCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const categoryHash = encodeURIComponent(item.category || '');
    navigate(`/menu#${categoryHash}`);
  };

  return (
    <div className="featured-card" onClick={handleClick}>
      <div className="featured-image-wrapper">
        <img src={item.image || '/images/fallback.jpg'} alt={item.title || '메뉴 이미지'} className="featured-image" />
        {item.type && (
          <span className={`type-badge badge-${item.type.toLowerCase().replace(/\s+/g, "")}`}>
            {item.type}
          </span>
        )}
      </div>
      <div className="featured-text">
        <h3>{item.title || '메뉴 이름 없음'}</h3>
        <p>{item.description || '설명 없음'}</p>
        <p className="nutrient">
          🥗 {item.calories || 0} kcal | P {item.protein || 0}g | C {item.carbs || 0}g | F {item.fat || 0}g | CO₂ {item.co2e || 0}kg
        </p>
      </div>
    </div>
  );
}
