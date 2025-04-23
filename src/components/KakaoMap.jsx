import React, { useEffect, useRef } from "react";

const KakaoMap = () => {
  const mapRef = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const loadKakaoMapScript = (callback) => {
      const scriptId = "kakao-map-script";
      if (document.getElementById(scriptId)) {
        callback();
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=0e43a107fbe290452441d453e0ae2026&autoload=false";
      script.onload = callback;
      script.onerror = () => console.error("❌ SDK script 로딩 실패");
      document.head.appendChild(script);
    };

    loadKakaoMapScript(() => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("❌ window.kakao.maps가 없음");
        return;
      }

      window.kakao.maps.load(() => {
        console.log("✅ Kakao 지도 로딩 성공 (우회)");

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5008, 127.0365),
          level: 6,
        });

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.5008, 127.0365),
          map,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:6px 10px;font-size:13px;">샐러드시티 역삼점</div>',
        });

        infowindow.open(map, marker);
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      });
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        margin: "20px 0",
        borderRadius: "16px",
        backgroundColor: "#eee",
      }}
    />
  );
};

export default KakaoMap;
