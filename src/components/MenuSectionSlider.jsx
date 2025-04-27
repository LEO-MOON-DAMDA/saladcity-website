import React, { useState } from "react";
import MenuSlider from "./MenuSlider";
import "./MenuSectionSlider.css";

export default function MenuSectionSlider({ title, items }) {
  const [activeTags, setActiveTags] = useState([]);

  const handleTagClick = (tagKey) => {
    const normalizedTag = tagKey.toLowerCase().replace(/\s/g, "");
    setActiveTags((prev) =>
      prev.includes(normalizedTag)
        ? prev.filter((tag) => tag !== normalizedTag)
        : [...prev, normalizedTag]
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
          const normalizedType = item.type?.toLowerCase().replace(/\s/g, "");
          return activeTags.some((tag) => tag === normalizedType);
        })
      : items;

  return (
    <div className="menu-section">
<h2
  className="menu-section-title"
  style={{
    position: 'relative',
    zIndex: 10,
    color: '#ffffff',
    opacity: 1,
    mixBlendMode: 'normal',
    textShadow: '0 4px 8px rgba(0,0,0,0.8)',
  }}
>
  {title}
</h2>
      {activeTags.length > 0 && (
       <div className="filter-bar show" style={{ marginBottom: '-30px', marginTop: '12px' }}>
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
