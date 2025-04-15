import React, { useRef, useEffect } from "react";
import MenuCard from "./MenuCard";
import "./MenuSlider.css";

export default function MenuSlider({ items, onTagClick, selectedTags }) {
  const scrollRef = useRef(null);

  // ✅ 중심 카드 애니메이션 효과
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
        const maxDistance = containerRect.width / 2;

        const normalized = Math.min(distance / maxDistance, 1);
        const scale = 1 - normalized * 0.2;        // 0.8 ~ 1
        const rotateY = normalized * 20;           // 0 ~ 20 deg
        const opacity = 1 - normalized * 0.5;
        const zIndex = 1000 - Math.floor(normalized * 100);

        card.style.transform = `scale(${scale}) rotateY(${cardCenter < containerCenter ? rotateY : -rotateY}deg)`;
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

  // ✅ 좌우 스크롤 버튼
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ 카드 제한
  const safeItems = items.slice(0, 10);

  return (
    <div className="slider-wrapper">
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
