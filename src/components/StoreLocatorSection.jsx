import React from "react";

const storeData = [
  {
    name: "샐러드시티 역삼점",
    address: "(06236) 서울특별시 강남구 역삼동 736-58 B2 104호 (역삼동, 위워크빌딩)",
    phone: "02-555-8501",
    hours: "월요일~금요일 오전 08:30 ~ 오후 08:30 토요일오전 10:00 ~ 오후 08:00",
  },
  {
    name: "샐러드시티 구디점",
    address: "(08378) 서울특별시 구로구 디지털로34길 27, 비101호 (구로동, 대륭포스트타워3차)",
    phone: "070-4471-7118",
    hours: "오전 09:30 ~ 오후 06:00",
  },
  {
    name: "샐러드시티 강동점",
    address: "(05353) 서울특별시 강동구 천호대로175길 52 1층 110호(길동, 영일빌딩)",
    phone: "02-477-8501",
    hours: "오전 09:00 ~ 오후 08:30",
  },
  {
    name: "샐러드시티 송파점",
    address: "서울특별시 송파구 송파대로45길 3-24",
    phone: "070-4027-7880",
    hours: "",
  },
  {
    name: "샐러드시티 반포점",
    address: "서울특별시 서초구 신반포로 194",
    phone: "070-4027-7880",
    hours: "",
  },
];

export default function StoreLocatorSection({ showMap = true }) {
  return (
    <section className="store-locator-section" style={{ paddingTop: 0 }}>
      <p className="sub-text">샐러드시티의 신선함을 직접 느낄 수 있는 오프라인 매장을 확인하세요.</p>

      <div className="store-info" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div className="store-text" style={{ flex: 1 }}>
          {storeData.map((store, index) => (
            <div key={index} className="store-block" style={{ marginBottom: '24px' }}>
              <h3>{store.name}</h3>
              <p>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {store.address}
                </a>
              </p>
              <p>{store.hours}</p>
              <p>{store.phone}</p>
            </div>
          ))}
        </div>

        {showMap && (
          <div className="store-map" style={{ flex: 1, minWidth: '300px' }}>
            <img
              src="/images/store-map-full.jpg"
              alt="샐러드시티 전체 매장 지도"
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
