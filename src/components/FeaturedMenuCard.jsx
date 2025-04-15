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
      <img src={item.image} alt={item.name} className="featured-image" />
      <div className="featured-text">
        <h3>{item.name}</h3>
        <p>{item.summary}</p>
      </div>
    </div>
  );
}

