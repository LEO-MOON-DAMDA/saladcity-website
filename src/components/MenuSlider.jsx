import React, { useRef, useEffect } from "react";
import MenuCard from "./MenuCard";
import "./MenuSlider.css";

export default function MenuSlider({ items, onTagClick, selectedTags }) {
  const scrollRef = useRef(null);

  // ✅ 카드 중심 확대 효과
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
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  // ✅ 스크롤 이동 함수 (좌우 버튼)
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ 안정화용 카드 제한 (10개)
  const safeItems = items.slice(0, 10);

  return (
    <div className="slider-wrapper">
      {/* 좌우 화살표 버튼 */}
      <button className="slider-arrow left" onClick={() => scroll(-1)}>
        ◀
      </button>
      <button className="slider-arrow right" onClick={() => scroll(1)}>
        ▶
      </button>

      <div className="slider-scroll-wrapper" ref={scrollRef}>
        {safeItems.map((item, idx) => (
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
