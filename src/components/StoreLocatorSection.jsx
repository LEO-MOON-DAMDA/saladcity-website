import React from "react";

const storeData = [
  {
    name: "샐러드시티 역삼점",
    address: "서울 강남구 테헤란로22길 15",
    phone: "02-555-8501",
    hours: "월~금 08:30 ~ 20:30 / 토 10:00 ~ 20:00",
  },
  {
    name: "샐러드시티 구디점",
    address: "서울 구로구 디지털로34길 27",
    phone: "070-4471-7118",
    hours: "09:30 ~ 18:00",
  },
  {
    name: "샐러드시티 강동점",
    address: "서울 강동구 천호대로175길 52",
    phone: "02-477-8501",
    hours: "09:00 ~ 20:30",
  },
];

export default function StoreLocatorSection({ showMap = true }) {
  return (
    <section className="store-locator-section" style={{ paddingTop: 0 }}>
      <p className="sub-text" style={{ padding: "0 16px", marginBottom: "24px", fontSize: "16px", color: "#444" }}>
        샐러드시티의 신선함을 직접 느낄 수 있는 오프라인 매장을 확인하세요.
      </p>

      <div className="store-info" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: "0 16px" }}>
        <div className="store-text" style={{ flex: 1, minWidth: "300px" }}>
          {storeData.map((store, index) => (
            <div key={index} className="store-block" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{store.name}</h3>
              <p style={{ margin: "2px 0" }}>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#2f855a", fontWeight: "500" }}
                >
                  {store.address}
                </a>
              </p>
              <p style={{ margin: "2px 0", color: "#555" }}>{store.hours}</p>
              <p style={{ margin: "2px 0", color: "#555" }}>{store.phone}</p>
            </div>
          ))}
        </div>

        {showMap && (
          <div className="store-map" style={{ flex: 1, minWidth: "300px" }}>
            <iframe
              title="Saladcity Map"
              width="100%"
              height="360"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=샐러드시티`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
