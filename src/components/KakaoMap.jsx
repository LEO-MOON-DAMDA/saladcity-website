// src/components/KakaoMap.jsx
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
            name: "샐러드시티 구디점",
            lat: 37.4849,
            lng: 126.8966,
            address: "서울 구로구 디지털로34길 27",
            phone: "02-888-3030",
            image: "/images/Locations/1LOGD03.jpg",
          },
          {
            name: "샐러드시티 강동점",
            lat: 37.538574,
            lng: 127.148842,
            address: "서울 강동구 천호대로175길 52",
            phone: "02-444-2020",
            image: "/images/Locations/1LOKD01.jpg",
          },
          {
            name: "샐러드시티 반포점 (본사)",
            lat: 37.501,
            lng: 126.987,
            address: "서울 서초구 반포대로 123",
            phone: "02-123-4567",
            image: "/images/Locations/1LOBP001.jpg",
          },
          {
            name: "샐러드시티 서초점",
            lat: 37.491,
            lng: 127.010,
            address: "서울 서초구 서초대로 45길",
            phone: "02-222-8899",
            image: "/images/Locations/1LOSC01.jpg",
          },
          {
            name: "샐러드시티 송파점",
            lat: 37.515,
            lng: 127.112,
            address: "서울 송파구 올림픽로 300",
            phone: "02-777-0707",
            image: "/images/Locations/1LOSP01.jpg",
          },
          {
            name: "샐러드시티 제천농장",
            lat: 37.137,
            lng: 128.196,
            address: "충북 제천시 금성면",
            phone: "043-651-1234",
            image: "/images/Locations/1LOJC02.jpg",
          },
          {
            name: "샐러드시티 포천농장",
            lat: 38.003,
            lng: 127.195,
            address: "경기 포천시 군내면",
            phone: "031-532-6789",
            image: "/images/Locations/1LOPC01.jpg",
          },
          {
            name: "샐러드시티 전처리 공장",
            lat: 37.590,
            lng: 127.210,
            address: "경기 남양주시 와부읍",
            phone: "031-987-4560",
            image: "/images/Locations/1LOBD01.jpg",
          },
        ];

        locations.forEach(({ name, lat, lng, address, phone, image }) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
            map,
          });

          const iwContent = `
            <div style="padding:8px 12px;">
              <div style="font-weight:bold; font-size:14px; color:#2f5130; margin-bottom:4px;">${name}</div>
              <img src="${image}" style="width:200px;height:100px;object-fit:cover;border-radius:8px;margin-bottom:6px;" />
              <div style="font-size:13px; color:#555;">${address}</div>
              <div style="font-size:13px; color:#888;">${phone}</div>
            </div>
          `;
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
