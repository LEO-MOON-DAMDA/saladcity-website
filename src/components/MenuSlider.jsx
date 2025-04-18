import React, { useRef, useEffect } from "react";
import MenuCard from "./MenuCard";
import "./MenuSlider.css";

// ✅ 슬라이드 효과음 (짧은 whoosh)
const slideSound =
  "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAAMEAAAC7nAAA";

export default function MenuSlider({ items, onTagClick, selectedTags }) {
  const scrollRef = useRef(null);
  const audioRef = useRef(null);

  // 사운드 초기화
  useEffect(() => {
    audioRef.current = new Audio(slideSound);
  }, []);

  // 카드 애니메이션 + 확대/회전/블러
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

    // ✅ 한 프레임 딜레이 후 애니메이션 실행
    const timeout = setTimeout(() => {
      container.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // 최초 실행
    }, 50);

    return () => {
      clearTimeout(timeout);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  // ✅ 3배 복제 구조
  const tripledItems = [...items, ...items, ...items];
  const centerIndex = items.length;

  // 중앙 정렬
  useEffect(() => {
    const container = scrollRef.current;
    const card = container?.querySelector(".scroll-card");
    if (container && card) {
      const cardWidth = card.offsetWidth + 6; // 마진 포함
      container.scrollLeft = centerIndex * cardWidth;
    }
  }, [items]);

  // 사운드 재생
  const playSound = () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("🔇 오디오 재생 차단:", err);
          });
        }
      } catch (err) {
        console.error("🔇 오디오 오류:", err);
      }
    }
  };

  const scrollToCard = (direction) => {
    const container = scrollRef.current;
    const card = container.querySelector(".scroll-card");
    if (!container || !card) return;

    const cardWidth = card.offsetWidth + 6;
    const currentScroll = container.scrollLeft;
    const targetScroll = currentScroll + direction * cardWidth;

    playSound();
    if (navigator.vibrate) navigator.vibrate(20);

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
