import React, { useEffect } from "react";

export default function KakaoMap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=261f12530740989e7f97fbb28840ed8a"; // ✅ autoload 제거
    script.async = true;

    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("🔴 window.kakao.maps 로딩 실패");
        return;
      }

      const container = document.getElementById("map");
      if (!container) {
        console.error("❌ map DOM 없음");
        return;
      }

      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5008, 127.0365),
        level: 6,
      });

      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(37.5008, 127.0365),
      });

      console.log("✅ 지도 로딩 완료");
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
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "16px",
          backgroundColor: "#e2f5e7",
        }}
      />
    </div>
  );
}
