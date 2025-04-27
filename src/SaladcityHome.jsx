import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import homepageMenuItems from "./data/homepageMenuItems.json";
import FeaturedMenuSection from "./components/FeaturedMenuSection";
import SubscriptionSection from "./components/SubscriptionSection";
import ReviewSection from "./components/ReviewSection";
import InstaFeedSection from "./components/InstaFeedSection";
import OurMissionSection from "./components/OurMissionSection";
import StoreLocatorSection from "./components/StoreLocatorSection";
import TheMarketSection from "./components/TheMarketSection";
import Footer from "./components/Footer";
import ScrollingBanner from "./components/ScrollingBanner";

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

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#f6fdf8", margin: "0", padding: "0", paddingTop: "0px", overflow: "visible", position: "relative", minHeight: "100vh" }}>
      <Header hideLogo={location.pathname === "/"} />

      <section style={{ minHeight: "80vh", marginBottom: "2px", position: "relative", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <video
          key={videoIndex}
          ref={videoRef}
          src={videoList[videoIndex]}
          autoPlay
          muted
          loop={false}
          playsInline
          className="hero-video"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            filter: 'brightness(0.9)'
          }}
          onEnded={handleVideoEnd}
        />
        <div className="hero-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0) 100%)',
          animation: 'fadeInOverlay 1.8s ease-in-out forwards',
          opacity: 0
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#ffffff',
          padding: '0 16px'
        }}>
          <img src="/images/saladcitylogo.png"
            alt="Saladcity Logo"
            className="hero-logo"
            style={{
              height: '160px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
            }}
          />
          <h1 className="hero-title" style={{ fontSize: '42px', fontWeight: '600', margin: '0 0 10px' }}>
            건강하고 맛있는 샐러드
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '18px', color: '#e0e0e0', marginBottom: '4px' }}>
            자연에서 온 재료로 매일 새롭게, 신선하게
          </p>
          <p className="hero-subsubtitle" style={{ fontSize: '15px', color: '#cccccc' }}>
            Fresh ingredients, made daily with care.
          </p>
        </div>
      </section>

      <ScrollingBanner />
      <FeaturedMenuSection items={homepageMenuItems} />
      <OurMissionSection />
      <SubscriptionSection />
      <StoreLocatorSection showMap={true} />   {/* ✅ 여기로 이동 */}
      <ReviewSection />
      <InstaFeedSection />
      <TheMarketSection />
      <Footer />

      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .hero-video { height: 80vh !important; }
          .hero-logo { height: 100px !important; }
          .hero-title { font-size: 30px !important; }
          .hero-subtitle { font-size: 16px !important; }
          .hero-subsubtitle { font-size: 14px !important; }
        }
      `}</style>
    </div>
  );
}
