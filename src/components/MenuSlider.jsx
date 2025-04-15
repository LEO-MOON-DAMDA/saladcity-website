import React, { useRef, useEffect } from "react";
import MenuCard from "./MenuCard";
import "./MenuSlider.css";

export default function MenuSlider({ items, onTagClick, selectedTags }) {
  const scrollRef = useRef(null);

  // 카드 중심 확대 효과 적용
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll(".scroll-card");
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        const scale = Math.max(0.85, 1 - distance / 800);
        const opacity = Math.max(0.4, 1 - distance / 600);
        const zIndex = 1000 - Math.floor(distance);

        card.style.transform = `scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 실행

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  return (
    <div className="slider-wrapper">
      <div className="slider-scroll-wrapper" ref={scrollRef}>
        {items.map((item, idx) => (
          <MenuCard
            key={idx}
            item={item}
            onTagClick={onTagClick}
            selectedTags={selectedTags}
          />
        ))}
      </div>
    </div>
  );
}
