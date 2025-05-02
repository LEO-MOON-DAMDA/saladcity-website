import React, { useEffect, useState } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import "./OutpostCoverageMap.css";

const OutpostCoverageMap = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      const { data, error } = await supabaseOutpost
        .from("delivery_coverage")
        .select("*")
        .eq("active", true);

      if (!error) setAreas(data);
    };

    fetchAreas();
  }, []);

  return (
    <div className="coverage-map-container">
      <img
        src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/coverage-map.webp"
        alt="가능 지역 지도"
        className="coverage-map-img"
      />
      {areas.map((area) => (
        <div
          key={area.id}
          className="map-label"
          style={{
            top: `${area.y || 50}%`,
            left: `${area.x || 50}%`,
          }}
        >
          📍 {area.region}
          <br />
          {area.min_meals}식 이상
          <br />
          {area.days?.join(", ")} | {area.times?.join(", ")}
        </div>
      ))}
    </div>
  );
};

export default OutpostCoverageMap;
