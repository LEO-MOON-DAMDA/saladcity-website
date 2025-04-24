import React from "react";

// 프린트 전용 메뉴 데이터
const printableMenuData = [
  {
    name: "로스트베지 샐러드 Vegan",
    price: "₩10,900",
    image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/ABC01.jpg",
    description: "구운 당근, 브로콜리, 렌틸콩 등 구운 채소 조합",
    kcal: 320, protein: 10, carbs: 28, fat: 12, co2: 0.9
  },
  {
    name: "수비드 치킨 샐러드",
    price: "₩13,800",
    image: "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/sc모짜렐라01.jpg",
    description: "수비드한 닭가슴살과 슈퍼푸드 구성",
    kcal: 490, protein: 32, carbs: 22, fat: 18, co2: 1.3
  }
  // 필요시 더 추가 가능
];

const PrintableMenu = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        display: "none", // ✅ 화면에서는 숨김, 프린트할 때만 출력됨
        padding: "40px",
        fontFamily: "sans-serif"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "32px" }}>샐러드시티 메뉴</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center"
        }}
      >
        {printableMenuData.map((item, index) => (
          <div
            key={index}
            style={{
              width: "260px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center"
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px"
              }}
            />
            <h4>{item.name}</h4>
            <p style={{ fontSize: "14px", color: "#666" }}>{item.description}</p>
            <p><strong>{item.price}</strong></p>
            <p style={{ fontSize: "12px", color: "#999" }}>
              🥗 {item.kcal} kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2}kg
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PrintableMenu;
