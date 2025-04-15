import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./MenuSlider.css";

export default function MenuSlider({ items }) {
  const containerRef = useRef(null);

  return (
    <div className="slider-scroll-wrapper" ref={containerRef}>
      {items.map((item, index) => (
        <motion.div
          key={item.name}
          className="scroll-card"
          whileInView={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
      ))}
    </div>
  );
}
