import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=261f12530740989e7f97fbb28840ed8a";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5008, 127.0365), // 샐러드시티 중심
          level: 4,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const locations = [
          { name: "역삼점", lat: 37.5008, lng: 127.0365 },
          { name: "구디점", lat: 37.4849, lng: 126.8966 },
          // ⏩ 나중에 좌표 리스트 받아서 추가해줄게
        ];

        locations.forEach(({ name, lat, lng }) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
            map,
          });

          const iwContent = `<div style="padding:6px 12px;font-size:13px;font-weight:600;color:#2f5130;">${name}</div>`;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px", borderRadius: "16px" }} />;
};

export default KakaoMap;
