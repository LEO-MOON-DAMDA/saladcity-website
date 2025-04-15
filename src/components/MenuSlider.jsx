import React, { useRef, useEffect } from "react";
import MenuCard from "./MenuCard";
import "./MenuSlider.css";

// ✅ base64 인코딩된 짧은 슬라이드 사운드 (0.3초 whoosh 효과)
const slideSound =
  "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAAMEAAAC7nAAA..."; // 👉 실제 base64 길이 줄임처리

export default function MenuSlider({ items, onTagClick, selectedTags }) {
  const scrollRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(slideSound);
  }, []);

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
        const scale = 1 - normalized * 0.2;
        const rotateY = normalized * 20;
        const opacity = 1 - normalized * 0.5;
        const zIndex = 1000 - Math.floor(normalized * 100);

        card.style.transform = `scale(${scale}) rotateY(${cardCenter < containerCenter ? rotateY : -rotateY}deg)`;
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
        card.style.filter = `blur(${normalized}px)`;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const scrollToCard = (direction) => {
    const container = scrollRef.current;
    const card = container.querySelector(".scroll-card");
    if (!container || !card) return;

    const cardWidth = card.offsetWidth + 24;
    const currentScroll = container.scrollLeft;
    const targetScroll = currentScroll + direction * cardWidth;

    // 사운드
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    // 진동
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const safeItems = items.slice(0, 10);

  return (
    <div className="slider-wrapper">
      <button className="slider-arrow left" onClick={() => scrollToCard(-1)}>
        ◀
      </button>
      <button className="slider-arrow right" onClick={() => scrollToCard(1)}>
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
