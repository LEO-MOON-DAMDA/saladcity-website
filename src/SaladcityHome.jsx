import React from "react";
import CustomPrintableMenu from "./CustomPrintableMenu";

const menuItems = [
  {
    name: "로스트베지 샐러드 Vegan",
    price: "₩10,900",
    image: "/images/s_ABC.jpg",
    description: "구운 당근, 브로콜리, 렌틸콩 등 베스트셀러.",
    kcal: 320, protein: 10, carbs: 30, fat: 12, co2: 0.9
  },
  {
    name: "머쉬룸 샐러드 Ovo Vegetarian",
    price: "₩12,500",
    image: "/images/s_CCA.jpg",
    description: "국내산 머쉬룸, 단호박, 계란 토핑.",
    kcal: 430, protein: 17, carbs: 24, fat: 22, co2: 1.0
  },
  {
    name: "수비드 치킨 샐러드",
    price: "₩13,800",
    image: "/images/sc모짜렐라01.jpg",
    description: "국내산 닭가슴살 수비드 + 슈퍼푸드.",
    kcal: 490, protein: 32, carbs: 22, fat: 18, co2: 1.3
  },
  {
    name: "살몬 샐러드",
    price: "₩15,000",
    image: "/images/scttl02.jpg",
    description: "친환경 연어 + 건강한 샐러드.",
    kcal: 520, protein: 28, carbs: 20, fat: 25, co2: 2.1
  },
  {
    name: "스테이크 샐러드",
    price: "₩16,500",
    image: "/images/in_up_수비드돈목살파스타01.jpg",
    description: "소등심 스테이크 + 프리미엄 야채.",
    kcal: 580, protein: 34, carbs: 18, fat: 28, co2: 2.4
  }
];

export default function SaladcityHome() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8', paddingTop: '60px' }}>
      {/* 헤더 */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#fff',
        padding: '10px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
      }}>
        <nav style={{ display: 'flex', gap: '18px' }}>
          {[
            { text: "OUR MENU", href: "/menu" },
            { text: "OUR MISSION", href: "/mission" },
            { text: "THE MARKET", href: "/market" },
            { text: "OUTPOST", href: "/outpost" },
            { text: "CATERING", href: "/catering" },
            { text: "LOCATIONS", href: "/locations" }
          ].map((item, idx) => (
            <a key={idx} href={item.href} style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }}>
              {item.text}
            </a>
          ))}
        </nav>
        <a href="/order" style={{
          backgroundColor: '#3C8050',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 600
        }}>ORDER</a>
      </header>

      {/* Hero 영상 */}
      <section style={{
        height: '800px',
        position: 'relative',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <video src="/videos/joyful-healthy-eating.mp4" autoPlay muted loop playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)'
          }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/images/saladcity_origin.png" alt="logo" style={{ height: '180px' }} />
          <h1 style={{ fontSize: '36px', marginTop: '20px' }}>건강하고 맛있는 샐러드</h1>
          <p style={{ fontSize: '16px' }}>자연에서 온 재료로 매일 새롭게, 신선하게</p>
          <p style={{ fontSize: '14px', color: '#e0e0e0' }}>Fresh ingredients, made daily with care.</p>
        </div>
      </section>

      {/* 프리미엄 샐러드 */}
      <section style={{ padding: '60px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', color: '#275f3a', marginBottom: '40px' }}>
          프리미엄 샐러드
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          justifyContent: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {menuItems.map((item, idx) => (
            <div key={idx} style={{
              width: '280px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 16px rgba(0,0,0,0.07)',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.6)',
                    objectPosition: 'center'
                  }} />
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '17px', marginBottom: '6px' }}>{item.name}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{item.description}</p>
                <strong>{item.price}</strong>
                <p style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
                  🥗 {item.kcal} kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2}kg
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 이후 섹션 생략 */}
      {/* TODO: 플래터, 굿즈, 브랜드스토리, 구독, 매장, 인스타 피드 복원 추가 가능 */}

      <CustomPrintableMenu />

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
        <p>contact@saladcity.co.kr | 서울시 성동구 성수이로 113, 2층</p>
      </footer>
    </div>
  );
}
