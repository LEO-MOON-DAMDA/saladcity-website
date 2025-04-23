import React from "react";
import HeroSection from "../components/HeroSection";
import KakaoMap from "../components/KakaoMap";
import "../styles/LocationsPage.css";

const locations = [
  {
    name: "샐러드시티 역삼점",
    image: "/images/Locations/1LOYS08.jpg",
    address: "서울 강남구 테헤란로22길 15",
    phone: "02-555-8501",
  },
  {
    name: "샐러드시티 구디점",
    image: "/images/Locations/1LOGD03.jpg",
    address: "서울 구로구 디지털로34길 27",
    phone: "02-888-3030",
  },
  {
    name: "샐러드시티 강동점",
    image: "/images/Locations/1LOKD01.jpg",
    address: "서울 강동구 천호대로175길 52",
    phone: "02-444-2020",
  },
  {
    name: "샐러드시티 반포점",
    image: "/images/Locations/1LOBP001.jpg",
    address: "서울 서초구 반포대로 123",
    phone: "02-123-4567",
  },
  {
    name: "샐러드시티 서초점",
    image: "/images/Locations/1LOSC01.jpg",
    address: "서울 서초구 서초대로 45길",
    phone: "02-222-8899",
  },
  {
    name: "샐러드시티 송파점",
    image: "/images/Locations/1LOSP01.jpg",
    address: "서울 송파구 올림픽로 300",
    phone: "02-777-0707",
  },
  {
    name: "샐러드시티 제천농장",
    image: "/images/Locations/1LOJC02.jpg",
    address: "충북 제천시 금성면",
    phone: "043-651-1234",
  },
  {
    name: "샐러드시티 포천농장",
    image: "/images/Locations/1LOPC01.jpg",
    address: "경기 포천시 군내면",
    phone: "031-532-6789",
  },
  {
    name: "샐러드시티 전처리 공장",
    image: "/images/Locations/1LOBD01.jpg",
    address: "경기 남양주시 와부읍",
    phone: "031-987-4560",
  },
];

export default function LocationsPage() {
  return (
    <div className="locations-page">
      <HeroSection />

      <section style={{ padding: "40px 20px" }}>
        <h2
          style={{
            fontSize: "24px",
            color: "#2f5130",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          서울 매장 위치 안내
        </h2>
        <KakaoMap />
      </section>

      <div className="locations-grid">
        {locations.map((loc, idx) => (
          <div key={idx} className="location-card">
            <img src={loc.image} alt={loc.name} className="filter-warm" />
            <div className="location-info">
              <h3>{loc.name}</h3>
              <p>{loc.address}</p>
              <p>{loc.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
