import React from "react";
import FeaturedMenuSection from "./FeaturedMenuSection";
import InstaFeedSection from "./InstaFeedSection";
import menuItems from "../data/menuItems.json";
import "./HomePage.css";

export default function HomePage() {
  // 추천 메뉴 6개만 필터링
  const featuredItems = menuItems.filter(item => item.isFeatured).slice(0, 6);

  return (
    <div className="home-page">
      <header className="home-hero">
        <img src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/saladcity.jpg" alt="hero" />
      </header>

      <FeaturedMenuSection items={featuredItems} />
      <InstaFeedSection />
    </div>
  );
}

