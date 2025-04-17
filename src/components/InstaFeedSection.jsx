import React from "react";
import "./InstaFeedSection.css";
import BrandButton from "./BrandButton";

const images = [
  "/images/insta01.jpg",
  "/images/insta02.jpg",
  "/images/insta03.jpg",
  "/images/insta05.jpg",
  "/images/insta06.jpg"
];

export default function InstaFeedSection() {
  return (
    <section className="insta-feed-section">
      <h2 className="insta-title">#saladcity on Instagram</h2>
      <div className="insta-grid">
        {images.map((src, index) => (
          <div key={index} className="insta-item">
            <img src={src} alt={`insta-${index}`} />
          </div>
        ))}
      </div>
      <div className="insta-button-wrap">
        <BrandButton href="https://www.instagram.com/saladcity.official" target="_blank">
          인스타그램 더 보기 →
        </BrandButton>
      </div>
    </section>
  );
}
