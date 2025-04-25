import React from "react";
import "./MarketSocialGallery.css";

const galleryItems = [
  { id: 1, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/social/social01.webp", alt: "SALCY 감성컷 1" },
  { id: 2, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/social/social02.webp", alt: "SALCY 감성컷 2" },
  { id: 3, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/social/social03.webp", alt: "SALCY 감성컷 3" },
  { id: 4, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/social/social04.webp", alt: "SALCY 감성컷 4" },
  { id: 5, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/social/social05.webp", alt: "SALCY 감성컷 5" },
  { id: 6, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/social/social06.webp", alt: "SALCY 감성컷 6" },
];

export default function MarketSocialGallery() {
  return (
    <section className="social-gallery">
      <h2>#saladcitykorea</h2>
      <p>우리의 하루를 공유해준 감성 친구들</p>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-item">
            <img src={item.image} alt={item.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}
