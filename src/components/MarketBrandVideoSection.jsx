import React from "react";

export default function MarketBrandVideoSection() {
  return (
    <section style={{ position: "relative", height: "480px", overflow: "hidden" }}>
      <video
        src="/videos/brand_showcase.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2), rgba(0,0,0,0))",
          zIndex: 1
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          padding: "0 20px"
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px" }}>
          샐러드시티, 자연을 담다
        </h2>
        <p style={{ fontSize: "16px", maxWidth: "640px" }}>
          매일의 건강함을 전하기 위해, 샐러드시티는 자연 그대로의 재료를 가장 신선한 방식으로 담아냅니다.
        </p>
      </div>
    </section>
  );
}
