// ✅ MenuSectionSlider.jsx (뱃지 클릭 시 필터링 기능 포함)
import React, { useState } from "react";
import MenuSlider from "./MenuSlider";

export default function MenuSectionSlider({ title, items }) {
  const [activeTag, setActiveTag] = useState(null);

  const handleTagClick = (tagKey) => {
    setActiveTag(prev => (prev === tagKey ? null : tagKey));
  };

  const filteredItems = activeTag
    ? items.filter(item => item.name.toLowerCase().includes(activeTag.toLowerCase()))
    : items;

  return (
    <div style={{ margin: "60px 0" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "10px" }}>
        {title}
      </h2>

      {activeTag && (
        <p style={{ textAlign: "center", color: "#2c8f5b", marginBottom: "20px", fontWeight: 500 }}>
          선택된 필터: <span style={{ textTransform: "capitalize" }}>{activeTag}</span>
        </p>
      )}

      <MenuSlider items={filteredItems} onTagClick={handleTagClick} />
    </div>
  );
}
