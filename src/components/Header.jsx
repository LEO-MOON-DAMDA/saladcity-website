// src/components/Header.jsx
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isDetail = !isHome;

  const navItems = [
    { text: "OUR MENU", href: "/menu" },
    { text: "OUR MISSION", href: "/mission" },
    { text: "THE MARKET", href: "/market" },
    { text: "OUTPOST", href: "/outpost" },
    { text: "CATERING", href: "/catering" },
    { text: "LOCATIONS", href: "/locations" }
  ];

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#ffffffee",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 16px",
      zIndex: 1000,
      backdropFilter: "blur(6px)",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      height: "60px",
      boxSizing: "border-box"
    }}>
      {/* ✅ 로고 - 모바일 상세페이지에서만 중앙에 표시 */}
      {isMobile && isDetail && (
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <a href="/">
            <img src="/images/saladcity_origin.png" alt="home" style={{ height: '32px' }} />
          </a>
        </div>
      )}

      {/* ✅ 데스크탑용 좌측 로고 */}
      {!isMobile && (
        <a href="/">
          <img src="/images/saladcity_origin.png" alt="logo" style={{ height: "36px" }} />
        </a>
      )}

      {/* ✅ 모바일 햄버거 메뉴 */}
      {isMobile ? (
        <>
          <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer", zIndex: 1001 }}>
            <div style={{ width: "22px", height: "2px", backgroundColor: "#333", margin: "5px 0" }} />
            <div style={{ width: "22px", height: "2px", backgroundColor: "#333", margin: "5px 0" }} />
            <div style={{ width: "22px", height: "2px", backgroundColor: "#333", margin: "5px 0" }} />
          </div>
          {menuOpen && (
            <div style={{
              position: "absolute",
              top: "60px",
              left: 0,
              width: "100%",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              padding: "16px",
              zIndex: 999
            }}>
              {navItems.map((item, i) => (
                <a key={i} href={item.href} style={{
                  display: "block",
                  marginBottom: "12px",
                  color: "#333",
                  textDecoration: "none",
                  fontWeight: 500
                }}>{item.text}</a>
              ))}
              <a href="/order" style={{
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "#3C8050",
                color: "#fff",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600
              }}>ORDER</a>
            </div>
          )}
        </>
      ) : (
        // ✅ 데스크탑 네비게이션
        <>
          <nav style={{
            display: "flex",
            gap: "20px",
            marginLeft: "24px",
            flex: 1
          }}>
            {navItems.map((item, i) => (
              <a key={i} href={item.href} style={{
                textDecoration: "none",
                color: "#333",
                fontSize: "14px",
                fontWeight: 500
              }}>{item.text}</a>
            ))}
          </nav>
          <a href="/order" style={{
            backgroundColor: "#3C8050",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0
          }}>
            ORDER
          </a>
        </>
      )}
    </header>
  );
}

