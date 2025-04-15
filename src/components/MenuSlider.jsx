import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MenuSlider.css";

export default function MenuSlider({ items }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const slideTo = (index) => {
    setCurrent(index);
    sound.currentTime = 0;
    sound.play();
  };

  const nextSlide = () => {
    slideTo((current + 1) % items.length);
  };

  const prevSlide = () => {
    slideTo((current - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const autoSlide = () => {
      nextSlide();
    };
    timeoutRef.current = setInterval(autoSlide, 5000);
    return () => clearInterval(timeoutRef.current);
  }, [current]);

  return (
    <div className="slider-container">
      <button className="arrow left" onClick={prevSlide}>‹</button>
      <div className="slider-wrapper">
        <AnimatePresence initial={false} mode="wait">
          {items.map((item, index) => {
            const isActive = index === current;
            const offset = index - current;

            return (
              <motion.div
                key={item.name}
                className={`card ${isActive ? "active" : "inactive"}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: isActive ? 1.2 : 0.9 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{
                  transform: `translateX(${offset * 320}px)`,
                  zIndex: isActive ? 10 : 1,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-image"
                />
                <div className="card-text">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span>{item.price}원</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <button className="arrow right" onClick={nextSlide}>›</button>
    </div>
  );
}
