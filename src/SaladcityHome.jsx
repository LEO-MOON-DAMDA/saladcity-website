
import CustomPrintableMenu from "./CustomPrintableMenu";

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
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8', paddingTop: '50px' }}>
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
              <p style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
                🥗 {item.kcal} kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2}kg
              </p>
            </div>
          </div>
        ))}
      </div>

      <CustomPrintableMenu />
    </div>
  );
}
