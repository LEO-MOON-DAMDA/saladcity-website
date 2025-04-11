import React from "react";

const menuItems = [
  {
    name: "수비드 돈목살 샐러드",
    price: "₩11,900",
    image: "/images/샐러드돈목살01.jpg",
    description: "부드럽게 조리된 돈목살과 신선한 채소의 조화"
  },
  {
    name: "로스트 베지 샐러드",
    price: "₩10,500",
    image: "/images/샐러드로스트베지01.jpg",
    description: "다양한 구운 야채와 렌틸콩, 고소한 드레싱"
  },
  {
    name: "머쉬룸 샐러드",
    price: "₩10,900",
    image: "/images/샐러드머쉬룸01.jpg",
    description: "버섯과 아보카도가 어우러진 담백한 샐러드"
  },
  {
    name: "버섯 불고기 샐러드",
    price: "₩12,000",
    image: "/images/샐러드버섯불고기01.jpg",
    description: "단짠 버섯 불고기와 신선 채소의 푸짐한 구성"
  },
  {
    name: "비프 스테이크 샐러드",
    price: "₩13,500",
    image: "/images/샐러드스테이크01.jpg",
    description: "소고기 스테이크와 곡물, 채소의 든든한 한 끼"
  },
  {
    name: "갈릭 오리 마늘 샐러드",
    price: "₩12,900",
    image: "/images/샐러드오리마늘01.jpg",
    description: "훈제오리와 구운 마늘, 고소한 토핑의 조화"
  }
];

export default function SaladcityHome() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8' }}>
      {/* 배경 + 로고 */}
      <div style={{
        position: 'relative',
        height: '800px',
        backgroundImage: 'url(/images/farm-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(36, 70, 44, 0.65), rgba(36, 70, 44, 0.15))',
          backdropFilter: 'blur(3px)',
          opacity: 0.85,
          zIndex: 1
  }}></div>
      <div style={{ position: 'relative', zIndex: 2 }}>
          <img src="/images/saladcity_origin.png" alt="Saladcity Logo" style={{ height: '100px', marginBottom: '20px' }} />
          <h1 style={{ fontSize: '40px', margin: '0' }}>건강하고 맛있는 샐러드</h1>
          <p style={{ fontSize: '18px', marginTop: '8px' }}>자연에서 온 재료로 매일 새롭게, 신선하게</p>
          <p style={{ fontSize: '14px', color: '#e0e0e0' }}>Fresh ingredients, made daily with care.</p>
     </div>
</div>

      {/* 메뉴 섹션 */}
      <section style={{ padding: '60px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '40px', color: '#275f3a' }}>메뉴 소개</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {menuItems.map((item, index) => (
            <div key={index} style={{
              width: '280px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 8px 16px rgba(0,0,0,0.07)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>{item.name}</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px' }}>{item.description}</p>
                <strong>{item.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 0',
        backgroundColor: '#eaf5ec',
        color: '#444',
        fontSize: '14px',
        borderTop: '1px solid #cfe3d5',
        marginTop: '60px'
      }}>
        <p>#Saladcity_Global</p>
        <p>© 2025 Saladcity. All rights reserved.</p>
      </footer>
    </div>
  );
}
