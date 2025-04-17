import React from "react";
import "./StoreLocatorSection.css";

export default function StoreLocatorSection() {
  return (
    <section className="store-locator-section">
      <h2 className="section-title">샐러드시티 매장 안내</h2>
      <p className="sub-text">샐러드시티의 신선함을 직접 느낄 수 있는 오프라인 매장을 확인하세요.</p>

      <div className="store-info">
        <div className="store-text">
          <h3>성수 본점</h3>
          <p>서울특별시 성동구 성수이로 113, 2층</p>
          <p>월–금: 11:00 ~ 20:00 / 토: 11:00 ~ 15:00</p>

          <h3>강남 스팟</h3>
          <p>서울특별시 강남구 테헤란로 231, 센터필드 2층</p>
          <p>월–금: 10:30 ~ 19:30</p>

          <h3>한남 스팟</h3>
          <p>서울특별시 용산구 독서당로 29길 38</p>
          <p>월–금: 11:00 ~ 18:00</p>
        </div>

        <div className="store-map">
          <img src="/images/store-map-full.jpg" alt="샐러드시티 전체 매장 지도" />
        </div>
      </div>
    </section>
  );
}
