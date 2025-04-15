import React, { useState, useEffect } from "react";
import MenuSlider from "./MenuSlider";
import "./MenuSectionSlider.css";

export default function MenuSectionSlider({ title, items }) {
  const [activeTags, setActiveTags] = useState([]);
  const [showFilterBar, setShowFilterBar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.pageYOffset || document.documentElement.scrollTop;

      if (current > lastScrollTop) {
        setShowFilterBar(false); // 아래로 스크롤 → 숨김
      } else {
        setShowFilterBar(true); // 위로 스크롤 → 다시 보여줌
      }

      setLastScrollTop(current <= 0 ? 0 : current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

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
        <div className={`filter-bar ${showFilterBar ? "show" : "hide"}`}>
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
