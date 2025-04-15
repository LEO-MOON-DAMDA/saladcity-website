// src/components/FeaturedMenuCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedMenuCard.css";

export default function FeaturedMenuCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const categoryHash = encodeURIComponent(item.category);
    navigate(`/menu#${categoryHash}`);
  };

  return (
    <div className="featured-card" onClick={handleClick}>
      <img src={item.image} alt={item.title} className="featured-image" />
      <div className="featured-text">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p className="nutrient">
          🥗 {item.calories} kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2e}kg
        </p>
      </div>
    </div>
  );
}
