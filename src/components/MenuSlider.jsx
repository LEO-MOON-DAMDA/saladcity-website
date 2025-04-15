// MenuSlider.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MenuSlider.css";

export default function MenuSlider({ items }) {
  const containerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const loopedItems = [...items, ...items, ...items];
  const originalLength = items.length;
  const startIndex = originalLength;

  useEffect(() => {
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
    }

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

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateCenter();
          ticking = false;
        });
        ticking = true;
      }
    };

    ref.addEventListener("scroll", handleScroll);
    ref.addEventListener("pointerdown", updateCenter);
    ref.addEventListener("touchstart", updateCenter);
    return () => {
      ref.removeEventListener("scroll", handleScroll);
      ref.removeEventListener("pointerdown", updateCenter);
      ref.removeEventListener("touchstart", updateCenter);
    };
  }, [centerIndex]);

  return (
    <div className="slider-scroll-wrapper" ref={containerRef}>
      {loopedItems.map((item, index) => {
        const offset = index - centerIndex;
        const overlap = Math.abs(offset) <= 2;
        const isCenter = index === centerIndex;

        return (
          <motion.div
            key={`${item.name}-${index}`}
            className="scroll-card"
            style={{
              marginLeft: offset < 0 ? -40 : 0,
              marginRight: offset > 0 ? -40 : 0,
              zIndex: isCenter ? 10 : 5 - Math.abs(offset),
            }}
            animate={{
              scale: isCenter ? 1.25 : overlap ? 0.85 : 0.7,
              opacity: overlap ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <img src={item.image} alt={item.name} className="card-image" />
            <div className="card-text">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>{item.price}원</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
