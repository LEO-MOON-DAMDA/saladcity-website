import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuCategoryNav.css";

const categories = [
  "샐시 프리미엄 샐러드",
  "PASTA SALAD",
  "PLATTER",
  "POKE (DIET BOWL)",
  "샐시 JUICE",
  "DRESSING"
];

export default function MenuCategoryNav() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    const encoded = encodeURIComponent(category);
    navigate(`/menu#${encoded}`);
  };

  return (
    <nav className="menu-category-nav">
      {categories.map((cat) => (
        <button key={cat} onClick={() => handleClick(cat)} className="menu-nav-btn">
          {cat}
        </button>
      ))}
    </nav>
  );
}

