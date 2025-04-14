import React from "react";
import CustomPrintableMenu from "./CustomPrintableMenu";

export default function SaladcityHome() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8', paddingTop: '50px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '36px', color: '#275f3a' }}>Saladcity Home</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        샐러드시티에 오신 것을 환영합니다! 건강한 한 끼, 정성껏 준비했어요.
      </p>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <img
          src="/images/saladcity_origin.png"
          alt="Saladcity Logo"
          style={{ height: '200px', marginBottom: '20px' }}
        />
        <br />
        <CustomPrintableMenu />
      </div>
    </div>
  );
}
