// src/components/Header.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isHome = location.pathname === "/";

  const menuItems = [
    { text: "OUR MENU", href: "/menu" },
    { text: "OUR MISSION", href: "/mission" },
    { text: "THE MARKET", href: "/market" },
    { text: "OUTPOST", href: "/outpost" },
    { text: "CATERING", href: "/catering" },
    { text: "LOCATIONS", href: "/locations" },
  ];

  const handleLogoClick = () => navigate("/");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#ffffffee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 24px",
        zIndex: 1000,
        backdropFilter: "blur(6px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        height: "60px",
        boxSizing: "border-box",
      }}
    >
      {isMobile ? (
        <>
          {/* 🍔 모바일 햄버거 메뉴 */}
          <button
            onClick={() => alert("모바일 메뉴 토글 (추후 Drawer 도입 가능)")}
            style={{
              fontSize: "20px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ☰
          </button>

          {/* 상세페이지일 경우 중앙 로고 */}
          {!isHome && (
            <img
              src="/images/saladcity_origin.png"
              alt="Saladcity"
              style={{ height: "40px", cursor: "pointer" }}
              onClick={handleLogoClick}
            />
          )}
        </>
      ) : (
        <>
          {/* ⬅️ PC: 좌측 로고 */}
          <img
            src="/images/saladcity_origin.png"
            alt="Saladcity"
            style={{
              height: "44px",
              visibility: isHome ? "hidden" : "visible", // 홈화면에서 숨기기
              pointerEvents: isHome ? "none" : "auto",
              cursor: "pointer",
            }}
            onClick={handleLogoClick}
          />

          {/* PC: 네비게이션 */}
          <nav
            style={{
              display: "flex",
              gap: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.3px",
            }}
          >
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                style={{
                  textDecoration: "none",
                  color: "#333",
                  paddingBottom: "2px",
                  borderBottom: "2px solid transparent",
                  transition: "color 0.2s ease, border-bottom 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3C8050";
                  e.currentTarget.style.borderBottom = "2px solid #3C8050";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#333";
                  e.currentTarget.style.borderBottom = "2px solid transparent";
                }}
              >
                {item.text}
              </a>
            ))}
          </nav>

          {/* PC: 우측 ORDER 버튼 */}
          <a
            href="/order"
            style={{
              backgroundColor: "#3C8050",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            ORDER
          </a>
        </>
      )}
    </header>
  );
}
