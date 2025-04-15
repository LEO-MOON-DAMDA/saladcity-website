// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ 반응형 체크
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
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
      justifyContent: isMobile ? 'center' : 'space-between',
      padding: '8px 24px',
      zIndex: 1000,
      backdropFilter: 'blur(6px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '60px',
      boxSizing: 'border-box'
    }}>
      {/* ✅ PC - 수평 메뉴 */}
      {!isMobile && (
        <>
          {/* 로고는 상세페이지에서만 표시 */}
          {location.pathname !== "/" && (
            <a href="/" style={{ marginRight: '16px' }}>
              <img src="/images/saladcity_origin.png" alt="home" style={{ height: '38px' }} />
            </a>
          )}
          <nav style={{
            display: 'flex',
            gap: '18px',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.3px'
          }}>
            {menuItems.map((link, index) => (
              <a key={index} href={link.href} style={{
                textDecoration: 'none',
                color: '#333',
                paddingBottom: '2px',
                borderBottom: '2px solid transparent',
                transition: 'color 0.2s ease, borderBottom 0.2s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3C8050';
                  e.currentTarget.style.borderBottom = '2px solid #3C8050';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.borderBottom = '2px solid transparent';
                }}
              >
                {link.text}
              </a>
            ))}
          </nav>
          <a href="/order" style={{
            backgroundColor: '#3C8050',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}>
            ORDER
          </a>
        </>
      )}

      {/* ✅ Mobile - 햄버거 + 로고 (상세페이지에서만) */}
      {isMobile && (
        <>
          {location.pathname !== "/" && (
            <a href="/" style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <img src="/images/saladcity_origin.png" alt="home" style={{ height: '34px' }} />
            </a>
          )}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '24px',
            cursor: 'pointer'
          }}>
            <div style={{ width: '24px', height: '2px', backgroundColor: '#333', marginBottom: '6px' }} />
            <div style={{ width: '24px', height: '2px', backgroundColor: '#333', marginBottom: '6px' }} />
            <div style={{ width: '24px', height: '2px', backgroundColor: '#333' }} />
          </div>
        </>
      )}
    </header>
  );
}
