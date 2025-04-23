import React, { useRef } from "react";
import HeroSection from "../components/HeroSection";
import KakaoMap from "../components/KakaoMap";
import "../styles/LocationsPage.css";

const locations = [
  { name: "샐러드시티 본사", image: "/images/Locations/1LOHQ01.jpg", address: "서울특별시 강남구 테헤란로22길 15", phone: "02-000-0000", type: "headquarter" },
  { name: "샐러드시티 역삼점", image: "/images/Locations/1LOYS08.jpg", address: "서울 강남구 테헤란로22길 15", phone: "02-555-8501", type: "store" },
  { name: "샐러드시티 구디점", image: "/images/Locations/1LOGD03.jpg", address: "서울 구로구 디지털로34길 27", phone: "02-888-3030", type: "store" },
  { name: "샐러드시티 강동점", image: "/images/Locations/1LOKD01.jpg", address: "서울 강동구 천호대로175길 52", phone: "02-444-2020", type: "store" },
  { name: "샐러드시티 반포점", image: "/images/Locations/1LOBP001.jpg", address: "서울 서초구 반포대로 123", phone: "02-123-4567", type: "store" },
  { name: "샐러드시티 서초점", image: "/images/Locations/1LOSC01.jpg", address: "서울 서초구 서초대로 45길", phone: "02-222-8899", type: "store" },
  { name: "샐러드시티 송파점", image: "/images/Locations/1LOSP01.jpg", address: "서울 송파구 올림픽로 300", phone: "02-777-0707", type: "store" },
  { name: "샐러드시티 제천농장", image: "/images/Locations/1LOJC02.jpg", address: "충북 제천시 금성면", phone: "043-651-1234", type: "farm" },
  { name: "샐러드시티 포천농장", image: "/images/Locations/1LOPC01.jpg", address: "경기 포천시 군내면", phone: "031-532-6789", type: "farm" },
  { name: "샐러드시티 전처리 공장", image: "/images/Locations/1LOBD01.jpg", address: "경기 남양주시 와부읍", phone: "031-987-4560", type: "factory" }
];

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

  return (
    <div className="locations-page">
      {/* 1. Hero 인트로 */}
      <HeroSection />

      {/* 2. 브랜드 인트로 메시지 */}
      <section className="intro-section" style={{ padding: "60px 20px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "26px", marginBottom: "12px", color: "#2f5130" }}>샐러드시티, 오늘을 담다</h2>
        <p style={{ fontSize: "15px", color: "#666" }}>
          From farm to fork, a journey of honesty and health.
        </p>
      </section>

      {/* 3. Kakao 지도 섹션 */}
      <section className="map-section" style={{ padding: "40px 20px" }}>
        <KakaoMap ref={mapRef} locations={locations} onMarkerClick={scrollToCard} />
      </section>

      {/* 4. 매장 카드 섹션 */}
      <section className="store-list-section" style={{ padding: "40px 20px" }}>
        <div className="locations-grid">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="location-card"
              ref={(el) => (cardRefs.current[idx] = el)}
              onClick={() => handleCardClick(idx)}
            >
              <img
                src={loc.image}
                alt={loc.name}
                className={`filter-warm ${
                  ["샐러드시티 서초점", "샐러드시티 제천농장", "샐러드시티 포천농장"].includes(loc.name)
                    ? "custom-top"
                    : ""
                } ${
                  ["샐러드시티 제천농장", "샐러드시티 포천농장"].includes(loc.name)
                    ? "custom-offset"
                    : ""
                }`}
              />
              <div className="location-info">
                {loc.type && (
                  <span className={`store-type-badge type-${loc.type}`}>
                    {loc.type === "headquarter" && "본사"}
                    {loc.type === "farm" && "농장"}
                    {loc.type === "factory" && "공장"}
                  </span>
                )}
                <h3>{loc.name}</h3>
                <p>{loc.address}</p>
                <p>{loc.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA 정기식 구독 연결 */}
      <section className="cta-section" style={{ padding: "60px 20px", textAlign: "center" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "16px", color: "#2f5130" }}>이 매장에서 만나볼 수 있어요</h3>
        <button className="subscribe-button" style={{ padding: "12px 24px", fontSize: "16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "8px" }}>
          정기식 구독 바로가기
        </button>
      </section>
    </div>
  );
}
