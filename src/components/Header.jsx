// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDetail = !isHome;
  const isMobile = window.innerWidth < 768;

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
      {/* ✅ PC 버전: 수평 메뉴 + 조건부 로고 */}
      {!isMobile && (
        <>
          {isDetail && (
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
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            ORDER
          </a>
        </>
      )}

      {/* ✅ 모바일 버전 */}
      {isMobile && (
        <>
          {isDetail && (
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
