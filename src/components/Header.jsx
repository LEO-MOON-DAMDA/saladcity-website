import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHome = location.pathname === "/";

  const navLinks = [
    { text: "OUR MENU", href: "/menu" },
    { text: "OUR MISSION", href: "/mission" },
    { text: "THE MARKET", href: "/market" },
    { text: "OUTPOST", href: "/outpost" },
    { text: "CATERING", href: "/catering" },
    { text: "LOCATIONS", href: "/locations" },
  ];

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
      {/* ✅ PC: 좌측 로고 (홈 제외) */}
      {!isMobile && !isHome && (
        <a href="/" style={{ fontWeight: "bold", fontSize: "18px", color: "#3C8050", textDecoration: "none" }}>
          Saladcity
        </a>
      )}

      {/* ✅ 모바일: 중앙 홈 로고 (상세페이지만) */}
      {isMobile && !isHome && (
        <a href="/" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <img src="/images/saladcity_origin.png" alt="Home" style={{ height: "36px" }} />
        </a>
      )}

      {/* ✅ PC: 수평 메뉴 */}
      {!isMobile && (
        <nav style={{ display: "flex", gap: "18px", fontSize: "14px", fontWeight: 500, letterSpacing: "0.3px" }}>
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              style={{
                textDecoration: "none",
                color: "#333",
                paddingBottom: "2px",
                borderBottom: "2px solid transparent",
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
              {link.text}
            </a>
          ))}
        </nav>
      )}

      {/* ✅ 모바일: 햄버거 */}
      {isMobile && (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#3C8050",
              cursor: "pointer",
              marginLeft: isHome ? "auto" : "0",
              zIndex: 1100,
            }}
          >
            ☰
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                left: 0,
                width: "100%",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
            >
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "12px 24px",
                    borderBottom: "1px solid #eee",
                    color: "#333",
                    textDecoration: "none",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </>
      )}

      {/* ✅ PC & Mobile: ORDER 버튼 */}
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
        }}
      >
        ORDER
      </a>
    </header>
  );
}
