import React, { useState } from "react";
import MenuSlider from "./MenuSlider";

export default function MenuSectionSlider({ title, items }) {
  const [activeTags, setActiveTags] = useState([]);

  const handleTagClick = (tagKey) => {
    setActiveTags((prev) =>
      prev.includes(tagKey)
        ? prev.filter((tag) => tag !== tagKey)
        : [...prev, tagKey]
    );
  };

  const clearTags = () => {
    setActiveTags([]);
  };

  const filteredItems = activeTags.length > 0
    ? items.filter(item => {
        const name = item.name.toLowerCase();
        return activeTags.some(tag => name.includes(tag.toLowerCase()));
      })
    : items;

  return (
    <div style={{ margin: "60px 0" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "10px" }}>
        {title}
      </h2>

      {activeTags.length > 0 && (
        <div style={{ textAlign: "center", color: "#2c8f5b", marginBottom: "20px", fontWeight: 500 }}>
          선택된 필터:
          {activeTags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                margin: "0 6px",
                padding: "2px 8px",
                border: "1px solid #2c8f5b",
                borderRadius: "999px",
                background: "#e6f4eb",
                color: "#2c8f5b",
                textTransform: "capitalize",
                fontSize: "13px",
              }}
            >
              {tag}
            </span>
          ))}
          <button
            onClick={clearTags}
            style={{
              marginLeft: "10px",
              background: "transparent",
              border: "none",
              color: "#999",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ❌
          </button>
        </div>
      )}

      <MenuSlider
        items={filteredItems}
        onTagClick={handleTagClick}
        selectedTags={activeTags}
      />
    </div>
  );
}
