import React, { useRef } from "react";
import HeroSection from "../components/HeroSection";
import KakaoMap from "../components/KakaoMap";
import stores from "../data/stores.json";
import "../styles/LocationsPage.css";
import "../components/cta-subscribe-button.css"; // ✅ 이렇게


export default function LocationsPage() {
  const cardRefs = useRef([]);
  const mapRef = useRef(null);

  const scrollToCard = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("selected");
      setTimeout(() => card.classList.remove("selected"), 2000);
    }
  };

  const handleCardClick = (index) => {
    if (mapRef.current) {
      mapRef.current.focusMarker(index);
    }
  };

  const scrollToMap = () => {
    const mapSection = document.querySelector(".map-section");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="locations-page">
      <HeroSection />

      <section className="intro-section" style={{ padding: "60px 20px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "26px", marginBottom: "12px", color: "#2f5130" }}>샐러드시티, 오늘을 담다</h2>
        <p style={{ fontSize: "15px", color: "#666" }}>
          From farm to fork, a journey of honesty and health.
        </p>
      </section>

      <section className="map-section" style={{ padding: "40px 20px" }}>
        <KakaoMap ref={mapRef} locations={stores} onMarkerClick={scrollToCard} />
      </section>

      {/* ✅ 매장 카드 섹션 */}
      <section className="store-list-section" style={{ padding: "40px 20px" }}>
        <div className="locations-grid">
          {stores.map((store, idx) => (
            <div
              key={idx}
              className="location-card"
              ref={(el) => (cardRefs.current[idx] = el)}
              onClick={() => handleCardClick(idx)}
            >
              <img
                src={store.image}
                alt={store.name}
                className="filter-warm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/Locations/default.webp";
                }}
              />
              <div className="location-info">
                {store.type && (
                  <span className={`store-type-badge type-${store.type}`}>
                    {store.type === "headquarter" && "본사"}
                    {store.type === "farm" && "농장"}
                    {store.type === "factory" && "공장"}
                    {store.type === "store" && "매장"}
                    {store.type === "upcoming" && "오픈예정"}
                    {store.type === "outpost" && "아웃포스트"}
                  </span>
                )}
                <h3>{store.name}</h3>
                <p className="store-address">{store.address}</p>
                <p className="store-phone">{store.phone}</p>
                {store.description && store.description !== "정보 없음" && (
                  <p className="store-description">{store.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ 하단 구독 CTA 수정 */}
      <section className="cta-section" style={{ padding: "60px 20px", textAlign: "center" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "16px", color: "#2f5130" }}>
          이 매장에서 만나볼 수 있어요
        </h3>
        <a
  href="/outpost/start"
  className="cta-subscribe-button"
  style={{ display: "inline-block", marginTop: "12px" }}
>
  정기식 구독 바로가기 →
</a>
      </section>
    </div>
  );
}
