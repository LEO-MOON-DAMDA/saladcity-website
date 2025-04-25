import React from "react";

export default function ShopSection() {
  return (
    <section style={{ padding: "80px 20px", textAlign: "center", backgroundColor: "#ffffff" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "12px", color: "#2f5130" }}>
        THE MARKET
      </h2>
      <p style={{ fontSize: "16px", color: "#666", maxWidth: "600px", margin: "0 auto 24px" }}>
        샐러드시티만의 감성과 취향이 담긴 굿즈를 곧 만나보실 수 있습니다.
        <br />
        Coming soon: Lifestyle goods curated with Saladcity’s spirit.
      </p>
      <img src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/shop-comingsoon.webp" alt="Saladcity Market" style={{ width: "100%", maxWidth: "600px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
    </section>
  );
}
