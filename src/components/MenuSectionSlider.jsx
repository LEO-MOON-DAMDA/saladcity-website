import React from "react";
import MenuSlider from "./MenuSlider";

export default function MenuSectionSlider({ title, items }) {
  return (
    <div style={{ margin: "60px 0" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "30px" }}>
        {title}
      </h2>
      <MenuSlider items={items} />
    </div>
  );
}
