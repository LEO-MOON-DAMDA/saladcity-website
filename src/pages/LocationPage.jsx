import React from "react";
import "./LocationPage.css";
import stores from "../data/stores.json";
import StoreCard from "../components/StoreCard";

export default function LocationPage() {
  return (
    <div className="location-page">
      {/* 서울 지도 영역 */}
      <div className="map-section">
        <img src="/images/seoul-map.jpg" alt="서울지도" className="map-image" />
        {/* 샐러드시티 컬러 마커 (임의 위치 예시) */}
        {stores.map((store, index) => (
          <div key={index} className="map-marker" style={{ top: `${20 + index * 5}%`, left: `${25 + index * 5}%` }} />
        ))}
      </div>

      {/* 매장 카드 리스트 */}
      <section className="store-list">
        <h2>샐러드시티 매장을 만나보세요</h2>
        <div className="store-grid">
          {stores.map((store, index) => (
            <StoreCard key={index} store={store} />
          ))}
        </div>
      </section>
    </div>
  );
}
