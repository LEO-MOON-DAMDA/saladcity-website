import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDetail = !isHome;

  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ 모바일 화면 체크용
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ 스크롤 시 햄버거 메뉴 자동 닫기
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const menuItems = [
    { text: "OUR MENU", href: "/menu" },
    { text: "OUR MISSION", href: "/mission" },
    { text: "OUTPOST", href: "/outpost" },
    { text: "SALCY CREW", href: "/reviews" },
    { text: "LOCATIONS", href: "/locations" },
    { text: "SOCIAL", href: "/social" },
    { text: "THE MARKET", href: "/market" }
  ];

  const baseColor = isHome ? '#fff' : '#333';
  const hoverColor = isHome ? '#A8FFD0' : '#3C8050';

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'transparent',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'space-between' : 'flex-start',
      padding: '8px 24px',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '60px',
      boxSizing: 'border-box'
    }}>
      
{/* ✅ PC 화면 */}
{!isMobile && (
  <>
    {isDetail && (
      <a href="/" style={{ marginRight: '16px' }}>
        <img src="/images/saladcitylogo_small.png"
          alt="home"
          style={{
            height: '54px',
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
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
        <a
          key={index}
          href={link.href}
          style={{
            textDecoration: 'none',
            color: baseColor,
            paddingBottom: '2px',
            borderBottom: '2px solid transparent',
            transition: 'color 0.2s ease, border-bottom 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = hoverColor;
            e.currentTarget.style.borderBottom = `2px solid ${hoverColor}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = baseColor;
            e.currentTarget.style.borderBottom = '2px solid transparent';
          }}
        >
          {link.text}
        </a>
      ))}
    </nav>

    {/* ✅ JOIN 버튼 */}
    <a href="/outpost/join" style={{
      backgroundColor: '#A3C09D',
      color: '#fff',
      padding: '6px 14px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      marginLeft: 'auto'
    }}>
      JOIN
    </a>

    {/* ✅ ORDER 버튼 */}
    <a href="/outpost/questionnaire" style={{
      backgroundColor: '#3C8050',
      color: '#fff',
      padding: '6px 14px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      marginLeft: '8px' /* 간격 줄임 */
    }}>
      ORDER
    </a>

    {/* 🛒 장바구니 */}
    <div
      onClick={() => window.location.href = "/cart"}
      style={{ position: "relative", cursor: "pointer", marginLeft: "16px" }}
    >
      🛒
      {totalCount > 0 && (
        <span style={{
          position: "absolute",
          top: "-6px",
          right: "-8px",
          backgroundColor: "#e53e3e",
          color: "#fff",
          borderRadius: "50%",
          padding: "2px 6px",
          fontSize: "11px",
          fontWeight: "bold"
        }}>
          {totalCount}
        </span>
      )}
    </div>
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
          src="/images/saladcitylogo_small.png"
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
        backgroundColor: baseColor, marginBottom: '6px',
        transition: 'all 0.3s ease',
        transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none'
      }} />
      <div style={{
        width: '24px', height: '2px',
        backgroundColor: baseColor, marginBottom: '6px',
        opacity: isOpen ? 0 : 1,
        transition: 'opacity 0.3s ease'
      }} />
      <div style={{
        width: '24px', height: '2px',
        backgroundColor: baseColor,
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
      backgroundColor: isHome ? 'rgba(0,0,0,0.9)' : '#fff',
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
          color: baseColor,
          borderBottom: isHome
            ? '1px solid rgba(255,255,255,0.2)'
            : '1px solid rgba(0,0,0,0.1)'
        }}>
          {link.text}
        </a>
      ))}

      {/* ✅ JOIN 버튼 */}
      <a href="/outpost/join" style={{
        display: 'block',
        marginTop: '12px',
        fontWeight: 'bold',
        color: hoverColor,
        textDecoration: 'underline'
      }}>
        JOIN →
      </a>

      {/* ✅ ORDER 버튼 */}
      <a href="/outpost/questionnaire" style={{
        display: 'block',
        marginTop: '8px',
        fontWeight: 'bold',
        color: hoverColor,
        textDecoration: 'underline'
      }}>
        ORDER →
      </a>

    </div>
  </>
)}

    </header>
  );
}
