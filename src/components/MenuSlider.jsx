import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MenuSlider.css";

export default function MenuSlider({ items }) {
  const containerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const lastLoopTime = useRef(0);
  const scrolling = useRef(false);

  const loopedItems = [...items, ...items, ...items];
  const originalLength = items.length;
  const startIndex = originalLength;

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      const middleCard = ref.children[startIndex];
      if (middleCard) {
        const cardWidth = middleCard.offsetWidth;
        const containerWidth = ref.offsetWidth;
        const computedStyle = window.getComputedStyle(middleCard);
        const marginLeft = parseInt(computedStyle.marginLeft) || 0;
        const marginRight = parseInt(computedStyle.marginRight) || 0;
        const marginOffset = (marginLeft + marginRight) / 2;

        ref.scrollLeft = middleCard.offsetLeft - (containerWidth / 2 - (cardWidth + marginOffset) / 2);
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
      const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
      const distance = Math.abs(containerCenter - nodeCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== centerIndex) {
      setCenterIndex(closestIndex);
    }

    const now = Date.now();
    const cardWidth = container.firstChild.offsetWidth;

    if (now - lastLoopTime.current > 500) {
      if (closestIndex <= originalLength / 4) {
        container.scrollLeft += originalLength * cardWidth;
        lastLoopTime.current = now;
      }
      if (closestIndex >= loopedItems.length - originalLength / 4) {
        container.scrollLeft -= originalLength * cardWidth;
        lastLoopTime.current = now;
      }
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

  const scrollByCard = (direction) => {
    if (scrolling.current) return;
    scrolling.current = true;

    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.firstChild.offsetWidth;
    container.scrollBy({ left: direction * cardWidth, behavior: "smooth" });

    setTimeout(() => {
      scrolling.current = false;
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") scrollByCard(-1);
      if (e.key === "ArrowRight") scrollByCard(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="slider-wrapper">
      <button className="slider-arrow left" onClick={() => scrollByCard(-1)}>‹</button>

      <div className="slider-scroll-wrapper" ref={containerRef}>
        {loopedItems.map((item, index) => {
          const offset = index - centerIndex;
          const distance = Math.abs(offset);
          const isCenter = index === centerIndex;

          // ✅ 거리 기반 scale/opacity
          const scale = isCenter ? 1.25 : Math.max(0.7, 1.25 - distance * 0.15);
          const opacity = isCenter ? 1 : Math.max(0.3, 1 - distance * 0.2);
          const rotateY = offset === 0 ? 0 : offset < 0 ? -35 : 35;
          const zIndex = isCenter ? 10 : 5 - distance;

          return (
            <motion.div
              key={`${item.name}-${index}`}
              className="scroll-card"
              style={{
                zIndex,
                marginLeft: offset < 0 ? -120 : 0,
                marginRight: offset > 0 ? -120 : 0,
              }}
              animate={{
                scale,
                opacity,
                rotateY,
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
          );
        })}
      </div>

      <button className="slider-arrow right" onClick={() => scrollByCard(1)}>›</button>
    </div>
  );
}
