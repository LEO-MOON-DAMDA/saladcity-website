import React, { useEffect, useRef } from "react";

const KakaoMap = () => {
  const mapRef = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    let retries = 0;

    const tryInit = () => {
      if (!window.kakao || !window.kakao.maps) {
        if (retries < 10) {
          console.warn(`⏳ Kakao SDK 로딩 대기 중... (${retries + 1}/10)`);
          retries += 1;
          setTimeout(tryInit, 500); // 0.5초마다 재시도
        } else {
          console.error("❌ Kakao SDK 로딩 실패");
        }
        return;
      }

      console.log("✅ Kakao 지도 로딩 성공");

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5008, 127.0365),
        level: 6,
      });

      const markerPosition = new window.kakao.maps.LatLng(37.5008, 127.0365);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:8px 14px;font-size:13px;">샐러드시티 역삼점</div>',
      });
      infowindow.open(map, marker);

      marker.addListener("click", () => {
        infowindow.open(map, marker);
        console.log("📍 샐러드시티 역삼점 마커 클릭됨");
      });
    };

    tryInit(); // 시작
  }, []);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        margin: "20px 0",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    />
  );
};

export default KakaoMap;
