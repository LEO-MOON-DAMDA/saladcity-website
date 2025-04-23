import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import BrandButton from "./BrandButton";
import SectionTitle from "./SectionTitle";
import "./TheMarketSection.css";

export default function TheMarketSection() {
  const [goods, setGoods] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchGoods = async () => {
      const { data, error } = await supabase
        .from("market_goods")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Supabase fetch error:", error.message);
      } else {
        setGoods(data || []);
      }
    };

    fetchGoods();
  }, []);

  return (
    <section className="market-section" style={{ marginTop: "80px" }}>
      <SectionTitle style={{ textAlign: "center", marginBottom: "32px" }}>
        THE MARKET
      </SectionTitle>

      <div className="market-slider" ref={sliderRef}>
        {goods.map((item) => (
          <div key={item.id} className="market-card">
            <img src={item.image_main} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString()}원</p>
            <a
              href={item.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="market-buy"
            >
              구매하기 →
            </a>
          </div>
        ))}
      </div>

      <div className="market-button-wrap">
        <BrandButton href="/market">전체 굿즈 보기 →</BrandButton>
      </div>
    </section>
  );
}
