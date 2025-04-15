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
      const nodeRect = node.getBoundingClientRect();
      const nodeCenter = nodeRect.left + nodeRect.width / 2;
      const distance = Math.abs(containerCenter - (container.scrollLeft + nodeCenter - container.offsetLeft));
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
      }, 100); // Only update after scroll has stopped for 100ms
    };

    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, [centerIndex]);

  return (
    <div className="slider-scroll-wrapper" ref={containerRef}>
      {items.map((item, index) => (
        <motion.div
          key={item.name}
          className="scroll-card"
          animate={{
            scale: index === centerIndex ? 1.15 : 0.9,
            zIndex: index === centerIndex ? 10 : 1,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
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
