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
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/images/saladcity_origin.png" alt="Saladcity Logo" style={{ height: '40px' }} />
          <h1 style={{ fontSize: '24px', margin: 0 }}>샐러드시티</h1>
        </div>
        <nav style={{ display: 'flex', gap: '16px' }}>
          <a href="#menu">메뉴</a>
          <a href="#shop">굿즈</a>
          <a href="#subscribe">정기식</a>
          <a href="#locations">매장</a>
        </nav>
      </header>

      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px' }}>건강하고 맛있는 샐러드</h2>
        <p style={{ color: '#555' }}>매일 새롭고 신선하게, 샐러드시티와 함께하는 식단.</p>
      </section>

      <section id="menu">
        <h3 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>메뉴 소개</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {menuItems.map((item, index) => (
            <div key={index} style={{ width: '300px', border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h4 style={{ margin: '0 0 8px' }}>{item.name}</h4>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px' }}>{item.description}</p>
                <strong>{item.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '60px', padding: '20px 0', color: '#777', borderTop: '1px solid #ddd' }}>
        <p>#Saladcity_Global</p>
        <p>© 2025 Saladcity. All rights reserved.</p>
      </footer>
    </div>
  );
}
