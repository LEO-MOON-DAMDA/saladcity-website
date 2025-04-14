import CustomPrintableMenu from "./CustomPrintableMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./components/MenuPage"; // 👉 방금 만든 메뉴페이지
import SaladcityHome from "./SaladcityHome"; // 기존 메인 페이지

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SaladcityHome />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}


const menuItems = [
  {
    name: "로스트베지 샐러드 Vegan",
    price: "₩10,900",
    image: "/images/ABC01.jpg",
    description: "구운 당근, 브로콜리, 컬리플라워와 렌틸콩 등 샐러드시티 베스트셀러.",
    kcal: 320, protein: 10, carbs: 30, fat: 12, co2: 0.9
  },
  {
    name: "머쉬룸 샐러드 Ovo Vegetarian",
    price: "₩12,500",
    image: "/images/CCA01.jpg",
    description: "쫄깃하게 구워낸 국내산 머쉬룸에 단호박, 아보카도, 유기농 계란까지 더한 든든한 샐러드.",
    kcal: 430, protein: 17, carbs: 24, fat: 22, co2: 1.0
  },
  {
    name: "수비드 치킨 샐러드",
    price: "₩13,800",
    image: "/images/sc모짜렐라01.jpg",
    description: "국내산 닭가슴살 수비드 + 슈퍼푸드 믹스 샐러드.",
    kcal: 490, protein: 32, carbs: 22, fat: 18, co2: 1.3
  },
  {
    name: "살몬 샐러드",
    price: "₩15,000",
    image: "/images/scttl02.jpg",
    description: "친환경 연어와 슈퍼푸드가 어우러진 고단백 샐러드.",
    kcal: 520, protein: 28, carbs: 20, fat: 25, co2: 2.1
  },
  {
    name: "수비드 스테이크 샐러드",
    price: "₩16,500",
    image: "/images/in_up_수비드돈목살파스타01.jpg",
    description: "소등심 스테이크와 채소가 어우러진 프리미엄 고단백 샐러드.",
    kcal: 580, protein: 34, carbs: 18, fat: 28, co2: 2.4
  }
];

export default function SaladcityHome() {

  return (
   <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8', paddingTop: '50px'}}>
   

     <header style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#ffffffee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 24px', // ⬅️ 여백 줄임
  zIndex: 1000,
  backdropFilter: 'blur(6px)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  height: '60px', // ⬅️ 높이 조정
  boxSizing: 'border-box',
  gap: '16px',
  flexWrap: 'wrap' // ⬅️ 작은 화면에서 자동 줄바꿈 허용
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
        transition: 'color 0.2s ease, border-bottom 0.2s ease',
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

      
      {/* 상단 Hero 영상 섹션 */}
      <div style={{
        position: 'relative',
        height: '800px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        <video
          src="/videos/joyful-healthy-eating.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            filter: 'brightness(0.7) blur(1.5px)'
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/images/saladcity_origin.png" alt="Saladcity Logo" style={{ height: '200px', marginBottom: '20px' }} />
          <h1 style={{ fontSize: '40px', margin: '0' }}>건강하고 맛있는 샐러드</h1>
          <p style={{ fontSize: '18px', marginTop: '8px' }}>자연에서 온 재료로 매일 새롭게, 신선하게</p>
          <p style={{ fontSize: '14px', color: '#e0e0e0' }}>Fresh ingredients, made daily with care.</p>
        </div>
      </div>

      {/* 메뉴 섹션 */}
     <section style={{ padding: '60px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '40px', color: '#275f3a' }}>
          프리미엄 샐러드
        </h2>
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
                <p style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
                  🥗 {item.kcal} kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2}kg
                </p>
              </div>
            </div>
          ))}
        </div>
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
            { name: "티셔츠", price: "₩19,000", image: "/images/goods-tshirt.jpg" },
            { name: "머그컵", price: "₩12,000", image: "/images/goods-mug.jpg" },
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

      {/* 정기식 구독 섹션 */}
      <section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '12px', color: '#275f3a' }}>
          샐러드시티 정기식 구독
        </h2>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#555', marginBottom: '40px' }}>
          매주 바뀌는 샐러드 구성을 받아보세요.<br />
          <span style={{ fontSize: '14px', color: '#9e9e9e' }}>
            A personalized salad subscription for your healthy routine.
          </span>
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '32px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { day: "월요일", name: "그릴드 치킨 샐러드", image: "/images/sub-monday.jpg" },
            { day: "화요일", name: "연어 아보카도 샐러드", image: "/images/sub-tuesday.jpg" },
            { day: "수요일", name: "머쉬룸 곡물 샐러드", image: "/images/sub-wednesday.jpg" },
            { day: "목요일", name: "채소 베지 샐러드", image: "/images/sub-thursday.jpg" },
            { day: "금요일", name: "스테이크 파워 샐러드", image: "/images/sub-friday.jpg" }
          ].map((item, index) => (
            <div key={index} style={{
              width: '200px',
              textAlign: 'center',
              backgroundColor: '#f8fdf9',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '12px 12px 20px' }}>
                <h4 style={{ fontSize: '15px', marginBottom: '4px', color: '#3C8050' }}>{item.day}</h4>
                <p style={{ fontSize: '14px', color: '#444' }}>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button style={{
            padding: '12px 24px',
            fontSize: '15px',
            backgroundColor: '#3C8050',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            정기배송 신청하기
          </button>
        </div>
      </section>
    
      
      {/* 매장 안내 섹션 */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f2f8f4' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '12px', color: '#275f3a' }}>
          샐러드시티 매장 안내
        </h2>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#555', marginBottom: '40px' }}>
          오프라인 매장에서 샐러드시티의 신선함을 직접 경험해보세요.<br />
          <span style={{ fontSize: '14px', color: '#9e9e9e' }}>
            Visit our locations to taste freshness in person.
          </span>
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '32px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            {
              name: "샐러드시티 강남점",
              address: "서울 강남구 테헤란로 123",
              hours: "매일 10:00 - 21:00",
              map: "https://place.map.kakao.com/123456789"
            },
            {
              name: "샐러드시티 합정점",
              address: "서울 마포구 양화로 55",
              hours: "매일 10:30 - 20:30",
              map: "https://place.map.kakao.com/987654321"
            }
          ].map((store, index) => (
            <div key={index} style={{
              width: '460px',
              borderRadius: '14px',
              backgroundColor: '#fff',
              boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
              padding: '20px'
            }}>
              <h4 style={{ fontSize: '18px', marginBottom: '8px', color: '#3C8050' }}>{store.name}</h4>
              <p style={{ fontSize: '14px', margin: '0 0 6px', color: '#555' }}>{store.address}</p>
              <p style={{ fontSize: '14px', margin: '0 0 12px', color: '#777' }}>{store.hours}</p>
              <a href={store.map} target="_blank" rel="noopener noreferrer" style={{
                fontSize: '13px',
                color: '#3C8050',
                textDecoration: 'underline'
              }}>
                카카오맵에서 보기 →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 인스타그램 피드 섹션 */}
<section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
  <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '12px', color: '#275f3a' }}>
    인스타그램 피드
  </h2>
  <p style={{ textAlign: 'center', fontSize: '16px', color: '#555', marginBottom: '40px' }}>
    @saladcity_global에서 우리의 이야기를 만나보세요.
  </p>

  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '24px',
    maxWidth: '1000px',
    margin: '0 auto'
  }}>
    {[
      "/images/insta01.jpg",
      "/images/insta02.jpg",
      "/images/insta03.jpg",
      "/images/insta04.jpg"
    ].map((img, index) => (
      <div key={index} style={{
        width: '220px',
        height: '220px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        backgroundColor: '#eee'
      }}>
        <img src={img} alt={`instagram-${index}`} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} />
      </div>
    ))}
  </div>

  <div style={{ textAlign: 'center', marginTop: '40px' }}>
    <a href="https://www.instagram.com/saladcity_global/" target="_blank" rel="noopener noreferrer" style={{
      fontSize: '15px',
      color: '#3C8050',
      textDecoration: 'underline'
    }}>
      인스타그램에서 더 보기 →
    </a>
  </div>
</section>
     
<CustomPrintableMenu />

    
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
        <p>contact@saladcity.co.kr | 서울시 성동구 성수이로 113, 2층</p>
      </footer>
    </div>


  );
}

