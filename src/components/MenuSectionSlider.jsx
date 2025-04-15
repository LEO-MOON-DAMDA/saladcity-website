import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import MenuCard from "./MenuCard";
import "./MenuSlider.css";

export default function MenuSectionSlider({ title, items }) {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "free-snap",
    slides: {
      perView: 2.2,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3.2,
          spacing: 28,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4.5,
          spacing: 32,
        },
      },
    },
    centered: true,
  });

  return (
    <section className="menu-section">
      <h2 className="section-title">{title}</h2>
      <div ref={sliderRef} className="keen-slider">
        {items.map((item, index) => (
          <div key={index} className="keen-slider__slide">
            <MenuCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

