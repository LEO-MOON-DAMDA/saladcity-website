// src/components/KakaoMap.jsx
import React, { useEffect, useRef } from "react";

const KakaoMap = () => {
  const mapRef = useRef(null);
  const loadedRef = useRef(false); // 중복 방지

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const initMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("❌ Kakao SDK 로딩 실패");
        return;
      }

      window.kakao.maps.load(() => {
        console.log("✅ Kakao 지도 로딩 완료");

        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(37.5008, 127.0365), // 역삼역 근처
          level: 6,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 마커
        const markerPosition = new window.kakao.maps.LatLng(37.5008, 127.0365);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        // 인포윈도우
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:8px 14px;font-size:13px;">샐러드시티 역삼점</div>',
        });
        infowindow.open(map, marker);

        marker.addListener("click", () => {
          infowindow.open(map, marker);
          console.log("📍 샐러드시티 역삼점 마커 클릭됨");
        });
      });
    };

    if (document.readyState === "complete") {
      initMap();
    } else {
      window.addEventListener("load", initMap);
    }
  }, []);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{ width: "100%", height: "400px", margin: "20px 0", borderRadius: "16px", overflow: "hidden" }}
    />
  );
};

export default KakaoMap;
