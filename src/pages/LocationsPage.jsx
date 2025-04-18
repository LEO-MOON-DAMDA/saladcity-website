import React from "react";
import "../styles/LocationsPage.css";

const locations = [
  {
    name: "샐러드시티 역삼점",
    type: "매장",
    image: "/images/locations/1LOYS08.jpg",
    address: "서울 강남구 테헤란로22길 15",
  },
  {
    name: "샐러드시티 구디점",
    type: "매장",
    image: "/images/locations/1LOGD03.jpg",
    address: "서울 구로구 디지털로34길 27",
  },
  {
    name: "샐러드시티 강동점",
    type: "매장",
    image: "/images/locations/1LOKD01.jpg",
    address: "서울 강동구 천호대로175길 52",
  },
  {
    name: "샐러드시티 반포점 (본사)",
    type: "본사",
    image: "/images/locations/1LOBP001.jpg",
    address: "서울 서초구 반포대로 123",
  },
  {
    name: "샐러드시티 서초점",
    type: "매장",
    image: "/images/locations/1LOSC01.jpg",
    address: "서울 서초구 서초대로 45길",
  },
  {
    name: "샐러드시티 송파점",
    type: "매장",
    image: "/images/locations/1LOSP01.jpg",
    address: "서울 송파구 올림픽로 300",
  },
  {
    name: "샐러드시티 제천농장",
    type: "농장",
    image: "/images/locations/1LOJC02.jpg",
    address: "충북 제천시 금성면",
  },
  {
    name: "샐러드시티 포천농장",
    type: "농장",
    image: "/images/locations/1LOPC01.jpg",
    address: "경기 포천시 군내면",
  },
  {
    name: "샐러드시티 전처리 공장",
    type: "공장",
    image: "/images/locations/1LOBD01.jpg",
    address: "경기 남양주시 와부읍",
  }
];

export default function LocationsPage() {
  return (
    <div className="locations-page">
      <div className="locations-header">
        <img src="/images/locations/1LOJC01.jpg" alt="메인" className="main-banner" />
        <div className="rank-image">
          <img src="/images/locations/rank.jpg" alt="서울지역 브랜드 영향력" />
        </div>
      </div>

      <div className="locations-grid">
        {locations.map((loc, idx) => (
          <div key={idx} className="location-card">
            <img src={loc.image} alt={loc.name} />
            <div className="location-info">
              <h3>{loc.name}</h3>
              <p className="type">{loc.type}</p>
              <p className="address">{loc.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
