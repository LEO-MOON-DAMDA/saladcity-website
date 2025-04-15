import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MenuSlider.css";

const sound = new Audio("/sounds/tactile_slide_click.mp3");

export default function MenuSlider({ items }) {
  const containerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

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
      sound.currentTime = 0;
      sound.play().catch(() => {});
      setCenterIndex(closestIndex);
    }
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", updateCenter, { passive: true });
    return () => ref.removeEventListener("scroll", updateCenter);
  }, [centerIndex]);

  return (
    <div className="slider-scroll-wrapper" ref={containerRef}>
      {items.map((item, index) => (
        <motion.div
          key={item.name}
          className="scroll-card"
          animate={{
            scale: index === centerIndex ? 1.15 : 0.92,
            zIndex: index === centerIndex ? 10 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
