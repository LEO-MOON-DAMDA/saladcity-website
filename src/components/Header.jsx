import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDetail = !isHome;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  const updateDevice = () => {
    setIsMobile(window.innerWidth < 768);
  };
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
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
      justifyContent: isMobile ? 'space-between' : 'flex-start', // ✅ PC는 좌측 정렬
      padding: '8px 24px',
      zIndex: 1000,
      backdropFilter: 'blur(6px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '60px',
      boxSizing: 'border-box'
    }}>

{/* ✅ PC 전용 네비게이션 메뉴 */}
{!isMobile && (
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
        transition: 'color 0.2s ease, border-Bottom 0.2s ease'
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
            marginLeft: 'auto' // ✅ PC에서 ORDER는 우측 끝으로 밀어줌
          }}>
            ORDER
          </a>
        </>
      )}

   {/* ✅ Mobile 화면 */}
      {isMobile && (
        <>
          {isDetail && (
            <a href="/" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src="/images/saladcity_origin.png"
                alt="home"
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </a>
          )}

          {/* 햄버거 버튼 */}
          <div onClick={() => setIsOpen(!isOpen)} style={{
            position: 'absolute',
            top: '29%',
            left: '24px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
          }}>
            <div style={{
              width: '24px', height: '2px',
              backgroundColor: '#333', marginBottom: '6px',
              transition: 'all 0.3s ease',
              transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none'
            }} />
            <div style={{
              width: '24px', height: '2px',
              backgroundColor: '#333', marginBottom: '6px',
              opacity: isOpen ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }} />
            <div style={{
              width: '24px', height: '2px',
              backgroundColor: '#333',
              transition: 'all 0.3s ease',
              transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none'
            }} />
          </div>

          {/* 드롭다운 메뉴 */}
          <div style={{
            maxHeight: isOpen ? '400px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.5s ease',
            position: 'absolute',
            top: '60px',
            left: 0,
            width: '100%',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: isOpen ? '16px 24px' : '0px',
            zIndex: 1500
          }}>
            {menuItems.map((link, index) => (
              <a key={index} href={link.href} style={{
                display: 'block',
                padding: '10px 0',
                fontSize: '15px',
                textDecoration: 'none',
                color: '#333',
                borderBottom: '1px solid #eee'
              }}>
                {link.text}
              </a>
            ))}
            <a href="/order" style={{
              display: 'block',
              marginTop: '12px',
              fontWeight: 'bold',
              color: '#3C8050',
              textDecoration: 'underline'
            }}>
              주문하기 →
            </a>
          </div>
        </>
      )}
    </header>
  );
}
