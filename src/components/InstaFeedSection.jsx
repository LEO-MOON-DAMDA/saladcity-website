// src/components/InstaFeedSection.jsx
import React from "react";
import "./InstaFeedSection.css";

const images = [
  "/images/insta01.jpg",
  "/images/insta02.jpg",
  "/images/insta03.jpg",
  "/images/insta04.jpg"
];

export default function InstaFeedSection() {
  return (
    <section className="insta-section">
      <h2>#Saladcity on Instagram</h2>
      <div className="insta-grid">
        {images.map((src, index) => (
          <div key={index} className="insta-image-wrapper">
            <img src={src} alt={`insta${index + 1}`} className="insta-image" />
          </div>
        ))}
      </div>
    </section>
  );
}

