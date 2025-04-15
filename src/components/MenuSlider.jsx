import React, { useRef, useEffect } from "react";
import MenuCard from "./MenuCard";
import "./MenuSlider.css";

// ✅ base64 사운드
const slideSound =
  "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA"
  + "AT//////+4UBxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
  + "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
  + "//uQZAAAAAAAAAAAAAAAAAAAAAAAGpAAD///+wAAACkAAAAAAAgICAgICAgICAgICAgICAgICAg"
  + "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg"
  + "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAA";

export default function MenuSlider({ items, onTagClick, selectedTags }) {
  const scrollRef = useRef(null);
  const audioRef = useRef(null);

  // 🔊 사운드
  useEffect(() => {
    audioRef.current = new Audio(slideSound);
  }, []);

  // 🎯 슬라이더 효과
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

  // 🔁 3배 복제하여 양쪽 여유 확보
  const tripledItems = [...items, ...items, ...items];
  const centerIndex = items.length;

  // ⏩ 시작 시 중앙으로 스크롤
  useEffect(() => {
    const container = scrollRef.current;
    const card = container?.querySelector(".scroll-card");
    if (container && card) {
      const cardWidth = card.offsetWidth + 6; // margin 포함 보정
      container.scrollLeft = centerIndex * cardWidth;
    }
  }, [items]);

  const scrollToCard = (direction) => {
    const container = scrollRef.current;
    const card = container.querySelector(".scroll-card");
    if (!container || !card) return;

    const cardWidth = card.offsetWidth + 6;
    const currentScroll = container.scrollLeft;
    const targetScroll = currentScroll + direction * cardWidth;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="slider-wrapper">
      <button className="slider-arrow left" onClick={() => scrollToCard(-1)}>
        ◀
      </button>
      <button className="slider-arrow right" onClick={() => scrollToCard(1)}>
        ▶
      </button>

      <div className="slider-scroll-wrapper" ref={scrollRef}>
        {tripledItems.map((item, idx) => (
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
