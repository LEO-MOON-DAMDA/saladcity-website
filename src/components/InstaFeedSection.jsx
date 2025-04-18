import React from "react";
import "./InstaFeedSection.css";
import BrandButton from "./BrandButton";
import SectionTitle from "./SectionTitle";

const images = [
  "/images/insta01.jpg",
  "/images/insta02.jpg",
  "/images/insta03.jpg",
  "/images/insta04.jpg",
  "/images/insta05.jpg"
];

export default function InstaFeedSection() {
  return (
    <section className="insta-feed-section" style={{ marginTop: "80px" }}>
      <SectionTitle style={{ textAlign: "center", marginBottom: "32px" }}>
        INSTAGRAM
      </SectionTitle>

      <div className="insta-grid">
        {images.map((src, index) => (
          <div key={index} className="insta-item">
            <img src={src} alt={`insta-${index + 1}`} />
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
