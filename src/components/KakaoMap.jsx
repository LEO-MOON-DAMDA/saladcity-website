import React, { useEffect, useRef } from "react";

const KakaoMap = () => {
  const loadedRef = useRef(false); // ✅ 중복 로딩 방지

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("⚠️ Kakao 객체 로딩 실패");
        return;
      }

      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) {
          console.error("❌ #map 요소 없음");
          return;
        }

        console.log("✅ Kakao 지도 로딩 시작됨");

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(37.5008, 127.0365),
          level: 6,
        });

        const locations = [
          {
            name: "샐러드시티 역삼점",
            lat: 37.5008,
            lng: 127.0365,
            address: "서울 강남구 테헤란로22길 15",
            phone: "02-555-8501",
            image: "/images/Locations/1LOYS08.jpg",
          },
        ];

        locations.forEach(({ name, lat, lng, address, phone, image }) => {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(lat, lng),
          });

          const content = `
            <div style="padding:10px; max-width:240px;">
              <strong style="color:#2f5130;">${name}</strong><br/>
              <img src="${image}" style="width:100%; height:100px; object-fit:cover; margin:6px 0; border-radius:8px;" />
              <p style="margin:0; font-size:13px;">${address}<br/><span style="color:#888">${phone}</span></p>
            </div>
          `;
          const iw = new window.kakao.maps.InfoWindow({ content });

          window.kakao.maps.event.addListener(marker, "click", () => {
            iw.open(map, marker);
            console.log(`📍 ${name} 마커 클릭됨`);
          });
        });
      });
    };

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=261f12530740989e7f97fbb28840ed8a";
      script.async = true;
      script.onload = loadKakaoMap;
      document.head.appendChild(script);
    } else {
      loadKakaoMap();
    }
  }, []);

  return (
    <div style={{ margin: "40px 0" }}>
      <h2 style={{ textAlign: "center", fontSize: "22px", color: "#2f5130", marginBottom: "12px" }}>
        서울 및 전국 매장 지도
      </h2>
      <div
        id="map"
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "16px",
          backgroundColor: "#e2f5e7",
        }}
      />
    </div>
  );
};

export default KakaoMap;
