// ✅ src/components/KakaoMap.jsx
import React, { useEffect, useRef } from "react";

const KakaoMap = ({ locations, onMarkerClick }) => {
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
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=57c4769f8b8532d54ee295e6705802b6&autoload=false";
      script.onload = callback;
      script.onerror = () =>
        console.error("❌ SDK script 로딩 실패 (AppKey 권한 문제일 수 있음)");
      document.head.appendChild(script);
    };

    loadKakaoMapScript(() => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("❌ window.kakao.maps가 없음");
        return;
      }

      window.kakao.maps.load(() => {
        console.log("✅ Kakao 지도 로딩 성공 (다중 마커)");

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5008, 127.0365),
          level: 6,
        });

        locations.forEach((loc, idx) => {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(loc.address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              const marker = new window.kakao.maps.Marker({
                map,
                position: coords,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:6px 10px;font-size:13px;">${loc.name}</div>`,
              });

              marker.addListener("click", () => {
                infowindow.open(map, marker);
                onMarkerClick && onMarkerClick(idx);
              });
            } else {
              console.warn("⚠️ 주소 좌표 변환 실패:", loc.address);
            }
          });
        });
      });
    });
  }, [locations, onMarkerClick]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        margin: "20px 0",
        borderRadius: "16px",
      }}
    />
  );
};

export default KakaoMap;
