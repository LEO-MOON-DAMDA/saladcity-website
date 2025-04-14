// src/components/MenuCard.jsx
import React from "react";

export default function MenuCard({ item }) {
  return (
    <div style={{
      width: '280px',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{item.name}</h3>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>{item.summary}</p>
        <strong style={{ fontSize: '15px', color: '#333' }}>{item.price.toLocaleString()}원</strong>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
          🥗 {item.kcal}kcal | P {item.protein}g | C {item.carbs}g | F {item.fat}g | CO₂e {item.co2}
        </p>
      </div>
    </div>
  );
}

