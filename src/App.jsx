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
          <img src="/images/saladcity_origin.png" alt="Saladcity Logo" style={{ height: '200px', marginBottom: '20px' }} />
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
             <div style={{ width: '100%', height: '230px', overflow: 'hidden' }}>
  <img
    src={item.image}
    alt={item.name}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      transform: 'scale(1.6)',
      transition: 'transform 0.3s ease'
    }}
  />
</div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>{item.name}</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px' }}>{item.description}</p>
                <strong>{item.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
{/* 굿즈 섹션 */}
<section style={{ padding: '60px 24px', backgroundColor: '#ffffff' }}>
  <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '12px', color: '#275f3a' }}>
    샐러드시티 굿즈
  </h2>
  <p style={{ textAlign: 'center', fontSize: '16px', color: '#555', marginBottom: '40px' }}>
    샐러드시티의 감성을 담은 아이템들<br />
    <span style={{ fontSize: '14px', color: '#9e9e9e' }}>
      Brand items that reflect the Saladcity lifestyle
    </span>
  </p>

  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    {[
      { name: "브랜드 티셔츠", price: "₩19,000", image: "/images/goods-tshirt.jpg" },
      { name: "샐러드시티 머그컵", price: "₩12,000", image: "/images/goods-mug.jpg" },
      { name: "에코백", price: "₩16,000", image: "/images/goods-ecobag.jpg" },
      { name: "그립톡", price: "₩9,000", image: "/images/goods-griptok.jpg" }
    ].map((item, index) => (
      <div key={index} style={{
        width: '240px',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#fafafa',
        boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <img src={item.image} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
        <div style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '16px', margin: '0 0 6px' }}>{item.name}</h4>
          <p style={{ fontSize: '14px', color: '#777' }}>{item.price}</p>
          <button style={{
            marginTop: '8px',
            padding: '6px 14px',
            backgroundColor: '#3C8050',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            자세히 보기
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

{/* 브랜드 스토리 섹션 */}
<section style={{ padding: '80px 24px', backgroundColor: '#f2f8f4', textAlign: 'center' }}>
  <h2 style={{ fontSize: '26px', marginBottom: '16px', color: '#2f5d3c' }}>
    샐러드가 바꿉니다
  </h2>
  <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '17px', lineHeight: '1.7', color: '#444' }}>
    우리는 단순한 식사가 아닌<br />
    더 건강하고 지속가능한 라이프스타일을 제안합니다.<br /><br />
    매일 샐러드를 먹는다는 것은<br />
    내 몸을 위한 선택이고,<br />
    더 나은 식문화에 대한 약속입니다.<br /><br />
    <span style={{ color: '#7fae85', fontWeight: 'bold' }}>
      Eat Clean, Eat Smart. With Saladcity.
    </span>
  </p>
</section>
{/* 플래터 메뉴 섹션 */}
<section style={{ padding: '80px 24px', backgroundColor: '#f9fefb' }}>
  <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '12px', color: '#275f3a' }}>
    구운야채 플래터
  </h2>
  <p style={{ textAlign: 'center', fontSize: '16px', color: '#555', marginBottom: '40px' }}>
    샐러드시티에서 제일 든든한 샐러드 플래터<br />
    <span style={{ fontSize: '14px', color: '#9e9e9e' }}>
      Grilled vegetable platters with seasonal proteins.
    </span>
  </p>

  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    {[
      {
        name: "수비드 스테이크 플래터",
        price: "₩15,500",
        image: "/images/scttl01.jpg",
        description: "수비드한 소고기 스테이크와 따뜻한 구운 제철 야채가 듬뿍 담긴 다이어트 플래터."
      },
      {
        name: "수비드 치킨 플래터",
        price: "₩13,000",
        image: "/images/scttl02.jpg",
        description: "부드러운 국내산 닭가슴살과 다양한 슈퍼푸드를 함께 담은 저탄고단백 식사."
      },
      {
        name: "훈제오리 갈릭 플래터",
        price: "₩13,800",
        image: "/images/scttl03.jpg",
        description: "마늘과 함께 구운 훈제오리 고기와 구운야채가 어우러진 풍미 가득한 플래터."
      },
      {
        name: "버섯 불고기 플래터",
        price: "₩12,000",
        image: "/images/scttl04.jpg",
        description: "버섯과 불고기를 함께 구워낸 한국식 웰빙 플래터. 하루 한끼 대체식으로도 추천."
      }
    ].map((item, index) => (
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
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{ width: '100%', height: '230px', overflow: 'hidden' }}>
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.6)',
              transition: 'transform 0.3s ease'
            }}
          />
        </div>
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
