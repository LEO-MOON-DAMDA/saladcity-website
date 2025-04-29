import React from "react";
import "./MarketSocialGallery.css";

const galleryItems = [
  { id: 1, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion01.webp", alt: "SALCY 감성컷 01" },
  { id: 2, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion054.webp", alt: "SALCY 감성컷 54" },
  { id: 3, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion04.webp", alt: "SALCY 감성컷 04" },
  { id: 4, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion12.webp", alt: "SALCY 감성컷 12" },
  { id: 5, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion10.webp", alt: "SALCY 감성컷 10" },
  { id: 6, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion07.webp", alt: "SALCY 감성컷 07" },
  { id: 7, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion02.webp", alt: "SALCY 감성컷 02" },
  { id: 8, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion09.webp", alt: "SALCY 감성컷 09" },
  { id: 9, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion03.webp", alt: "SALCY 감성컷 03" },
  { id: 10, image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/socialimage/salcyemotion06.webp", alt: "SALCY 감성컷 06" },
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
