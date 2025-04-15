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
        <div
          style={{
            position: "sticky", // ✅ 고정!
            top: 0,
            background: "#fff",
            padding: "10px 0",
            zIndex: 999,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            color: "#2c8f5b",
            fontWeight: 500,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          선택된 필터:
          {activeTags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 8px",
                background: "#e6f4eb",
                border: "1px solid #2c8f5b",
                borderRadius: "999px",
                fontSize: "13px",
                color: "#2c8f5b",
                textTransform: "capitalize",
              }}
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                style={{
                  marginLeft: "6px",
                  background: "transparent",
                  border: "none",
                  color: "#999",
                  fontSize: "14px",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ❌
              </button>
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
