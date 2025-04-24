import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const tagMap = {
  "샐러드시티 역삼점": "본점",
  "샐러드시티 제천농장": "농장",
  "샐러드시티 경기허브": "전처리공장",
  "샐러드시티 송파점": "오픈예정",
  "샐러드시티 반포점": "오픈예정",
  "샐러드시티 서초점": "아웃포스트점",
};

const KakaoMap = forwardRef(({ locations, onMarkerClick }, ref) => {
  const mapRef = useRef(null);
  const loadedRef = useRef(false);
  const kakaoMapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);

  useImperativeHandle(ref, () => ({
    focusMarker: (index) => {
      const marker = markersRef.current[index];
      const infowindow = infoWindowsRef.current[index];
      if (marker && kakaoMapRef.current) {
        kakaoMapRef.current.panTo(marker.getPosition());
        infowindow.open(kakaoMapRef.current, marker);
      }
    },
  }));

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
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=57c4769f8b8532d54ee295e6705802b6&autoload=false&libraries=services&ts=" +
        Date.now();
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
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5008, 127.0365),
          level: 6,
        });
        kakaoMapRef.current = map;

        const geocoder = new window.kakao.maps.services.Geocoder();

        locations.forEach((loc, idx) => {
          geocoder.addressSearch(loc.address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              const marker = new window.kakao.maps.Marker({
                map,
                position: coords,
              });
              markersRef.current[idx] = marker;

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:6px 10px;font-size:13px;">${loc.name}</div>`,
              });
              infoWindowsRef.current[idx] = infowindow;

              marker.addListener("click", () => {
                infowindow.open(map, marker);
                onMarkerClick && onMarkerClick(idx);
              });

              const tag = tagMap[loc.name];
              if (tag) {
                const overlayContent = `<div class='marker-tag'>${tag}</div>`;
                const customOverlay = new window.kakao.maps.CustomOverlay({
                  position: coords,
                  content: overlayContent,
                  yAnchor: 1.3,
                });
                customOverlay.setMap(map);
              }
            } else {
              console.warn("⚠️ 주소 좌표 변환 실패:", loc.address);
            }
          });
        });
      });
    });
  }, [locations, onMarkerClick]);

  return (
    <div style={{ position: "relative" }}>
      <div
        className="map-overlay"
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          background: "rgba(255, 255, 255, 0.85)",
          padding: "10px 16px",
          borderRadius: "12px",
          fontWeight: 600,
          fontSize: "15px",
          color: "#2f5130",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
          lineHeight: 1.5,
        }}
      >
        🥗 샐러드시티의 오늘을 만나는 지도<br />
        <span style={{ fontSize: "13px", fontWeight: 400 }}>
          A map of Saladcity's living presence
        </span>
      </div>

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          margin: "20px 0",
          borderRadius: "16px",
        }}
      />
    </div>
  );
});

export default KakaoMap;
