import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MenuSlider.css";

const sound = new Audio("/sounds/slide.mp3");

export default function MenuSlider({ items }) {
  const containerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollTimeout = useRef(null);

  // 복제된 아이템 배열 (loop 구현용)
  const loopedItems = [...items, ...items, ...items];
  const originalLength = items.length;
  const startIndex = originalLength; // 중앙 시작

  useEffect(() => {
    // 첫 로딩 시 중앙으로 스크롤 위치 이동
    const ref = containerRef.current;
    if (ref) {
      const middleCard = ref.children[startIndex];
      if (middleCard) {
        middleCard.scrollIntoView({ behavior: "auto", inline: "center" });
        setCenterIndex(startIndex);
      }
    }
  }, []);

  const updateCenter = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    container.childNodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const nodeCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - nodeCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== centerIndex) {
      setCenterIndex(closestIndex);
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }

    // 무한 루프처럼 보이게 처음/끝에서 jump
    if (closestIndex <= originalLength / 2) {
      container.scrollLeft += originalLength * container.firstChild.offsetWidth;
    }
    if (closestIndex >= loopedItems.length - originalLength / 2) {
      container.scrollLeft -= originalLength * container.firstChild.offsetWidth;
    }
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        updateCenter();
      }, 80);
    };

    const handlePointerDown = () => {
      updateCenter(); // 누를 때 즉시 중심 계산
    };

    ref.addEventListener("scroll", handleScroll);
    ref.addEventListener("pointerdown", handlePointerDown);
    return () => {
      ref.removeEventListener("scroll", handleScroll);
      ref.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [centerIndex]);

  return (
    <div className="slider-scroll-wrapper" ref={containerRef}>
      {loopedItems.map((item, index) => (
        <motion.div
          key={`${item.name}-${index}`}
          className="scroll-card"
          animate={{
            scale: index === centerIndex ? 1.25 : 0.85,
            zIndex: index === centerIndex ? 10 : 1,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
        >
          <img src={item.image} alt={item.name} className="card-image" />
          <div className="card-text">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>{item.price}원</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
