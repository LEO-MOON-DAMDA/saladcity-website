import React from "react";
import "./StoreCard.css";

export default function StoreCard({ store }) {
  return (
    <div className="store-card">
      <img
        src={`/images/${store.image}`}
        alt={store.name}
        className="store-image"
        onError={(e) => (e.target.src = "/images/default.jpg")}
      />
      <div className="store-content">
        <h3>{store.name}</h3>
        <p className="store-address">{store.address}</p>
        <p className="store-phone">{store.phone}</p>
        <p className="store-hours">{store.hours}</p>
        <p className="store-description">{store.description}</p>
      </div>
    </div>
  );
}

