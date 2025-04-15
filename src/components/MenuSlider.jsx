import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MenuSlider.css";

const sound = new Audio("/sounds/final_slide_click.mp3");

export default function MenuSlider({ items }) {
  const containerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollTimeout = useRef(null);

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
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        updateCenter();
      }, 100);
    };

    const handlePointerDown = () => {
      updateCenter(); // 사용자가 누르는 순간 바로 업데이트
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
      {items.map((item, index) => (
        <motion.div
          key={item.name}
          className="scroll-card"
          animate={{
            scale: index === centerIndex ? 1.25 : 0.85,
            zIndex: index === centerIndex ? 10 : 1,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 24 }}
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
