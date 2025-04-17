import React from "react";
import "./StoreLocatorSection.css";

const storeData = [
  {
    name: "역삼점",
    address: "(06236) 서울특별시 강남구 역삼동 736-58 B2 104호 (역삼동, 위워크빌딩)",
    phone: "02-555-8501",
    email: "skhuh@dosikitchen.com",
    hours: "월~금 08:30 ~ 20:30 / 토 10:00 ~ 17:00"
  },
  {
    name: "구디점",
    address: "(08378) 서울특별시 구로구 디지털로34길 27, 비101호 (구로동, 대륭포스트타워3차)",
    phone: "070-4471-7118",
    email: "bcmoon@dosikitchen.com",
    hours: "월~금 09:30 ~ 18:00"
  },
  {
    name: "강동점",
    address: "(05353) 서울특별시 강동구 천호대로175길 52 1층 110호(길동, 영일빌딩)",
    phone: "02-477-8501",
    email: "skhuh@dosikitchen.com",
    hours: "월~금 09:00 ~ 20:30"
  }
];

export default function StoreLocatorSection() {
  return (
    <section className="store-locator-section">
      <h2 className="section-title">샐러드시티 매장 안내</h2>
      <p className="sub-text">샐러드시티의 신선함을 직접 느낄 수 있는 오프라인 매장을 확인하세요.</p>

      <div className="store-info">
        <div className="store-text">
          {storeData.map((store, index) => (
            <div key={index} className="store-block">
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <p>{store.hours}</p>
              <p>{store.phone}</p>
              <p style={{ color: '#888', fontSize: '13px' }}>{store.email}</p>
            </div>
          ))}
        </div>
        <div className="store-map">
          <img src="/images/store-map-full.jpg" alt="샐러드시티 전체 매장 지도" />
        </div>
      </div>
    </section>
  );
}
