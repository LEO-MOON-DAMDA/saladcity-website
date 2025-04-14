import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8' }}>
      {/* ✅ 공통 헤더 */}
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
        boxSizing: 'border-box',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <nav style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '18px',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.3px',
          flex: 1,
          minWidth: 0
        }}>
          {[
            { text: "OUR MENU", href: "/menu" },
            { text: "OUR MISSION", href: "/mission" },
            { text: "THE MARKET", href: "/market" },
            { text: "OUTPOST", href: "/outpost" },
            { text: "CATERING", href: "/catering" },
            { text: "LOCATIONS", href: "/locations" }
          ].map((link, index) => (
            <a key={index} href={link.href} style={{
              textDecoration: 'none',
              color: '#333',
              paddingBottom: '2px',
              borderBottom: '2px solid transparent',
              transition: 'color 0.2s ease, borderBottom 0.2s ease',
              whiteSpace: 'nowrap'
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
      </header>

      {/* ✅ 페이지 내용 위치 */}
      <div style={{ paddingTop: '80px' }}>
        <Outlet />
      </div>
    </div>
  );
}

