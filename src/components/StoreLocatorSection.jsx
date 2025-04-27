import React, { useEffect, useState } from "react";
import KakaoMap from "./KakaoMap";
import stores from "../data/stores.json";
import "./StoreLocatorSection.css";

export default function StoreLocatorSection() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const cardStores = stores.filter(store =>
    ["샐러드시티 본사", "샐러드시티 역삼점", "샐러드시티 구디점", "샐러드시티 강동점"].includes(store.name)
  );

  return (
    <section className="store-locator-section">
      <h2>우리 매장</h2>
      <p className="sub-text">LOCATIONS</p>

      {showMap && (
        <div className="store-map">
          <KakaoMap locations={stores} />
        </div>
      )}

      <div className="store-list">
        {cardStores.map((store, idx) => (
          <div key={idx} className="store-card">
            <img
              src={store.image}
              alt={store.name}
              className="store-thumbnail"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/Locations/default.webp";
              }}
            />
            <div className="store-content">
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
  );
}
