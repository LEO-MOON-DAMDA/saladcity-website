// src/components/FeaturedMenuCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedMenuCard.css";

export default function FeaturedMenuCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const categoryHash = encodeURIComponent(item.카테고리);
    navigate(`/menu#${categoryHash}`);
  };

  return (
    <div className="featured-card" onClick={handleClick}>
      <img src={item.이미지경로} alt={item.메뉴명} className="featured-image" />
      <div className="featured-text">
        <h3>{item.메뉴명}</h3>
        <p>{item.요약설명}</p>
        <p className="nutrient">
          🥗 {item.칼로리} kcal | P {item.단백질}g | C {item.탄수화물}g | F {item.지방}g | CO₂e {item.환경지표}kg
        </p>
      </div>
    </div>
  );
}
