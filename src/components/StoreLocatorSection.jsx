import React from "react";

const storeData = [
  {
    name: "역삼점",
    address: "(06236) 서울특별시 강남구 역삼동 736-58 B2 104호 (역삼동, 위워크빌딩)",
    phone: "02-555-8501",
    email: "skhuh@dosikitchen.com",
    hours: "월~금 08:30 ~ 20:30",
  },
  {
    name: "성수점",
    address: "서울 성동구 성수이로 113 2층",
    phone: "02-1234-5678",
    email: "contact@saladcity.com",
    hours: "매일 09:00 ~ 21:00",
  },
];

export default function StoreLocatorSection({ showMap = true }) {
  return (
    <section className="store-locator-section">
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

        {showMap && (
          <div className="store-map">
            <img src="/images/store-map-full.jpg" alt="샐러드시티 전체 매장 지도" />
          </div>
        )}
      </div>
    </section>
  );
}
