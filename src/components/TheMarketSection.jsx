import React, { useEffect, useRef, useState } from "react";
import { loadGoodsFromSupabase } from "../utils/loadGoodsFromSupabase";
import BrandButton from "./BrandButton";
import SectionTitle from "./SectionTitle";
import "./TheMarketSection.css";

export default function TheMarketSection() {
  const [goods, setGoods] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await loadGoodsFromSupabase();
        setGoods(data || []);
      } catch (error) {
        console.error("❌ 상품 불러오기 실패:", error.message);
      }
    };
    fetchGoods();
  }, []);

  return (
    <section className="market-section" style={{ marginTop: "20px" }}>
      <SectionTitle style={{ textAlign: "center", marginBottom: "32px" }}>
        THE MARKET
      </SectionTitle>

      <div className="market-slider" ref={sliderRef}>
        {goods.length === 0 ? (
          <p className="market-empty">현재 판매 중인 굿즈가 없습니다.</p>
        ) : (
          goods
            .filter((item) => item.image_main && item.name && item.price)
            .map((item) => (
              <div key={item.id} className="market-card">
                <div className="market-image-wrapper">
                  <img src={item.image_main} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
                <p>{item.price.toLocaleString()}원</p>
                <div className="market-buy-wrap">
                  <a
                    href={item.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="market-buy"
                  >
                    구매하기 →
                  </a>
                </div>
              </div>
            ))
        )}
      </div>

      <div className="market-button-wrap">
        <BrandButton href="/shop">전체 굿즈 보기 →</BrandButton>
      </div>
    </section>
  );
}
