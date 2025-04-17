import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import homepageMenuItems from "./data/homepageMenuItems.json";
import FeaturedMenuSection from "./components/FeaturedMenuSection";
import CustomPrintableMenu from "./CustomPrintableMenu";
import SubscriptionSection from "./components/SubscriptionSection";
import ReviewSection from "./components/ReviewSection";
import InstaFeedSection from "./components/InstaFeedSection";
import OurMissionSection from "./components/OurMissionSection";
import StoreLocatorSection from "./components/StoreLocatorSection";
import ShopSection from "./components/ShopSection";
import ScrollingBanner from "./components/ScrollingBanner";
import SectionTitle from "./components/SectionTitle";
import BrandButton from "./components/BrandButton";

export default function SaladcityHome() {
  const videoRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const location = useLocation();

  const videoList = [
    "/videos/joyful-healthy-eating.mp4",
    "/videos/joyful2.mp4"
  ];

  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % videoList.length);
  };

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      @keyframes fadeInOverlay {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .hero-overlay {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        z-index: 1; pointer-events: none;
        background: linear-gradient(
          to bottom,
          rgba(0,0,0,0.6) 0%,
          rgba(0,0,0,0.35) 30%,
          rgba(0,0,0,0.15) 60%,
          rgba(0,0,0,0.05) 85%,
          rgba(0,0,0,0) 100%);
        opacity: 0;
        animation: fadeInOverlay 1.8s ease-in-out forwards;
      }
      .section-title {
        margin-bottom: 12px !important;
        text-align: left !important;
        padding-left: 24px;
      }
      .brand-button {
        display: inline-block;
        margin: 24px 0 0 24px;
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#f6fdf8", paddingTop: "0px", overflow: "visible", position: "relative", minHeight: "100vh" }}>
      <Header hideLogo={location.pathname === "/"} />

      <div style={{ position: 'relative', height: '800px', marginTop: '-60px', overflow: 'hidden' }}>
        <video
          key={videoIndex}
          ref={videoRef}
          src={videoList[videoIndex]}
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={handleVideoEnd}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div className="hero-overlay" />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#ffffff', padding: '0 16px' }}>
          <img src="/images/saladcity_origin.png" alt="Saladcity Logo" style={{ height: '160px', marginBottom: '24px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }} />
          <h1 style={{ fontSize: '42px', fontWeight: '600', margin: '0 0 10px' }}>건강하고 맛있는 샐러드</h1>
          <p style={{ fontSize: '18px', color: '#e0e0e0', marginBottom: '4px' }}>자연에서 온 재료로 매일 새롭게, 신선하게</p>
          <p style={{ fontSize: '15px', color: '#cccccc' }}>Fresh ingredients, made daily with care.</p>
        </div>
      </div>

      <ScrollingBanner />

      <SectionTitle>샐러드시티 추천메뉴</SectionTitle>
      <FeaturedMenuSection items={homepageMenuItems} />
      <div style={{ marginTop: '24px', marginLeft: '24px' }}>
        <BrandButton onClick={() => window.print()}>📄 메뉴 프린트하기</BrandButton>
      </div>

      <SectionTitle>우리는 왜 샐러드를 만들까요?</SectionTitle>
      <OurMissionSection />

      <SectionTitle>정기식 구독으로 더 간편하게</SectionTitle>
      <SubscriptionSection />

      <SectionTitle>SALCY CREW's 리뷰</SectionTitle>
      <ReviewSection />
      <div style={{ marginTop: '32px', marginLeft: '24px' }}>
        <BrandButton href="/reviews">전체 리뷰 보기 →</BrandButton>
      </div>

      <SectionTitle>샐러드시티 매장 안내</SectionTitle>
      <StoreLocatorSection />

      <InstaFeedSection />
      <ShopSection />

      <footer style={{ position: "relative", zIndex: 0, textAlign: 'center', padding: '40px 0', backgroundColor: '#eaf5ec', color: '#444', fontSize: '14px', borderTop: '1px solid #cfe3d5', marginTop: '60px' }}>
        <p>#Saladcity_Global</p>
        <p>© 2025 Saladcity. All rights reserved.</p>
        <p>contact@saladcity.co.kr | 서울시 성동구 성수이로 113, 2층</p>
      </footer>
    </div>
  );
}
