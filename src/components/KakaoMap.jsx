// ✅ src/components/KakaoMap.jsx (디버깅 + UX 리디자인 기반 준비)
import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=261f12530740989e7f97fbb28840ed8a";
    script.async = true;

    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("⚠️ Kakao 객체가 로딩되지 않았습니다.");
        return;
      }

      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        if (!mapContainer) {
          console.error("❌ #map 요소가 DOM에 없습니다.");
          return;
        }
        console.log("✅ Kakao 지도 로딩 시작됨");

        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5008, 127.0365),
          level: 6,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const locations = [
          {
            name: "샐러드시티 역삼점",
            lat: 37.5008,
            lng: 127.0365,
            address: "서울 강남구 테헤란로22길 15",
            phone: "02-555-8501",
            image: "/images/Locations/1LOYS08.jpg",
          },
          {
            name: "샐러드시티 제천농장",
            lat: 37.137,
            lng: 128.196,
            address: "충북 제천시 금성면",
            phone: "043-651-1234",
            image: "/images/Locations/1LOJC02.jpg",
          },
          // ✅ 전체 리스트 생략 가능 → 실제 구현 시 모두 넣기
        ];

        locations.forEach(({ name, lat, lng, address, phone, image }) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
            map,
          });

          const iwContent = `
            <div style=\"padding:8px 12px; max-width:240px;\">
              <div style=\"font-weight:600; font-size:14px; color:#2f5130; margin-bottom:4px;\">${name}</div>
              <img src=\"${image}\" style=\"width:100%; height:100px; object-fit:cover; border-radius:8px; margin-bottom:6px;\" />
              <div style=\"font-size:13px; color:#555;\">${address}</div>
              <div style=\"font-size:13px; color:#888;\">${phone}</div>
            </div>
          `;

          const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent });

          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
            console.log(`📍 ${name} 마커 클릭됨`);
          });
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div style={{ margin: "40px 0" }}>
      <h2 style={{ textAlign: "center", fontSize: "22px", color: "#2f5130", marginBottom: "12px" }}>
        서울 및 전국 매장 지도
      </h2>
      <div
        id="map"
        style={{ width: "100%", height: "500px", borderRadius: "16px", backgroundColor: "#e2f5e7" }}
      ></div>
    </div>
  );
};

export default KakaoMap;
