import React from "react";
import "./InstaFeedSection.css";

const images = [
  "/images/insta01.jpg",
  "/images/insta02.jpg",
  "/images/insta03.jpg",
  "/images/insta04.jpg",
  "/images/insta05.jpg",
  "/images/insta06.jpg",
];

export default function InstaFeedSection() {
  return (
    <section className="insta-feed-section">
      <h2 className="insta-title">#saladcity on Instagram</h2>
      <div className="insta-grid">
        {images.map((src, index) => (
          <div key={index} className="insta-item">
            <img
              src={src}
              alt={`insta-${index}`}
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
