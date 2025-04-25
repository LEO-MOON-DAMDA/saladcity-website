import React from "react";
import "./InstaFeedSection.css";
import BrandButton from "./BrandButton";
import SectionTitle from "./SectionTitle";

const images = [
  "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/insta01.webp",
  "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/insta02.webp",
  "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/insta03.webp",
  "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/insta04.webp",
  "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/insta05.webp"
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
        <BrandButton href="/social">
          인스타그램 더 보기 →
        </BrandButton>
      </div>
    </section>
  );
}
