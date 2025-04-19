import React from "react";
import MarketHeroSection from "../components/MarketHeroSection";
import MarketProductSlider from "../components/MarketProductSlider";
import MarketPhilosophy from "../components/MarketPhilosophy";
import MarketVIPNotice from "../components/MarketVIPNotice";
import MarketSocialGallery from "../components/MarketSocialGallery";

export default function MarketPage() {
  return (
    <div className="market-page">
      <MarketHeroSection />
      <MarketProductSlider />
      <MarketPhilosophy />
      <MarketVIPNotice />
      <MarketSocialGallery />
    </div>
  );
}
