import React, { useRef } from "react";

const CustomPrintableMenu = () => {
  const printRef = useRef();

  const handlePrint = () => {
    const content = printRef.current;
    const printWindow = window.open("", "_blank", "width=800,height=1000");
    printWindow.document.write(`
      <html>
        <head>
          <title>메뉴 인쇄</title>
          <style>
            body { font-family: sans-serif; padding: 40px; }
            h2 { text-align: center; margin-bottom: 24px; }
            .grid { display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; }
            .card {
              width: 260px;
              border: 1px solid #ccc;
              border-radius: 12px;
              padding: 16px;
              text-align: center;
            }
            .card img {
              width: 100%;
              height: 180px;
              object-fit: cover;
              border-radius: 8px;
              margin-bottom: 12px;
            }
            .card h4 { margin: 0 0 8px; }
            .card p { margin: 4px 0; font-size: 14px; color: #555; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const sampleMenus = [
    {
      name: "로스트베지 샐러드",
      price: "₩10,900",
      image: "/images/ABC01.jpg",
      description: "구운 채소와 렌틸콩의 영양 만점 조합",
      kcal: 320, protein: 10, carbs: 30, fat: 12, co2: 0.9
    },
    {
      name: "수비드 치킨 샐러드",
      price: "₩13,800",
      image: "/images/sc모짜렐라01.jpg",
      description: "수비드한 닭가슴살과 슈퍼푸드 구성",
      kcal: 490, protein: 32, carbs: 22, fat: 18, co2: 1.3
    }
  ];

  return (
    <div>
      <button
        onClick={handlePrint}
        style={{
          backgroundColor: '#3C8050',
          color: '#fff',
          padding: '10px 20px',
          fontSize: '14px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          margin: '40px auto 20px',
          display: 'block'
        }}
      >
        🖨 메뉴 프린트하기
      </button>

      {/* ✅ 이 부분을 화면에서 숨기기 */}
      <div ref={printRef} style={{ display: "none" }}>
        <h2>샐러드시티 메뉴</h2>
        <div className="grid">
          {sampleMenus.map((item, index) => (
            <div key={index} className="card">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p><strong>{item.price}</strong></p>
              <p style={{ fontSize: '12px', color: '#777' }}>
                🥗 {item.kcal} kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2}kg
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomPrintableMenu;
