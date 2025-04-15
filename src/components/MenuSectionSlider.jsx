import React, { useState } from "react";
import MenuSlider from "./MenuSlider";
import "./MenuSectionSlider.css"; // 👈 CSS 분리 추천

export default function MenuSectionSlider({ title, items }) {
  const [activeTags, setActiveTags] = useState([]);

  const handleTagClick = (tagKey) => {
    setActiveTags((prev) =>
      prev.includes(tagKey)
        ? prev.filter((tag) => tag !== tagKey)
        : [...prev, tagKey]
    );
  };

  const removeTag = (tagKey) => {
    setActiveTags((prev) => prev.filter((tag) => tag !== tagKey));
  };

  const clearTags = () => {
    setActiveTags([]);
  };

  const filteredItems =
    activeTags.length > 0
      ? items.filter((item) => {
          const name = item.name.toLowerCase();
          return activeTags.some((tag) => name.includes(tag.toLowerCase()));
        })
      : items;

  return (
    <div style={{ margin: "60px 0" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>

      {activeTags.length > 0 && (
        <div className="filter-bar">
          선택된 필터:
          {activeTags.map((tag, idx) => (
            <span key={idx} className="filter-tag selected">
              {tag}
              <button onClick={() => removeTag(tag)} className="filter-remove">
                ❌
              </button>
            </span>
          ))}
          <button onClick={clearTags} className="filter-clear">
            모두 초기화
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
