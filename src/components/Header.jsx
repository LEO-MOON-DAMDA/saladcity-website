// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isDetail = location.pathname !== "/";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#ffffffee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 24px',
      zIndex: 1000,
      backdropFilter: 'blur(6px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '60px',
      boxSizing: 'border-box'
    }}>
      {/* 좌측 로고 (PC 전용 or 모바일 상세화면만) */}
      {(!isMobile || isDetail) && (
        <div style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
          <img src="/images/saladcity_origin.png" alt="Logo" style={{ height: 38 }} />
        </div>
      )}

      {/* 네비게이션 메뉴 (PC) */}
      {!isMobile && (
        <nav style={{
          display: 'flex',
          gap: '20px',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.3px',
          marginLeft: '32px',
          flex: 1
        }}>
          {navItems.map((link, idx) => (
            <a key={idx} href={link.href} style={{
              textDecoration: 'none',
              color: '#333',
              borderBottom: '2px solid transparent',
              transition: 'color 0.2s, border-bottom 0.2s'
            }}>
              {link.text}
            </a>
          ))}
        </nav>
      )}

      {/* 햄버거 아이콘 (모바일만) */}
      {isMobile && (
        <div onClick={() => setMenuOpen(!menuOpen)} style={{
          position: 'absolute',
          left: 24,
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 1100
        }}>
          ☰
        </div>
      )}

      {/* 모바일 햄버거 메뉴 */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed',
          top: 60,
          left: 0,
          width: '100%',
          backgroundColor: '#fff',
          zIndex: 2000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          padding: '16px'
        }}>
          {navItems.map((link, idx) => (
            <a key={idx} href={link.href} style={{
              display: 'block',
              padding: '12px 0',
              textDecoration: 'none',
              color: '#333',
              fontWeight: 500,
              borderBottom: '1px solid #ddd'
            }}>
              {link.text}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
