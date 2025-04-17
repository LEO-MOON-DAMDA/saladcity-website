export default function StoreLocatorSection({ showMap = true }) {
  return (
    <section className="store-locator-section">
      <p className="sub-text">샐러드시티의 신선함을 직접 느낄 수 있는 오프라인 매장을 확인하세요.</p>

      <div className="store-info">
        <div className="store-text">
          {storeData.map((store, index) => (
            <div key={index} className="store-block">
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <p>{store.hours}</p>
              <p>{store.phone}</p>
              <p style={{ color: '#888', fontSize: '13px' }}>{store.email}</p>
            </div>
          ))}
        </div>

        {showMap && (
          <div className="store-map">
            <img src="/images/store-map-full.jpg" alt="샐러드시티 전체 매장 지도" />
          </div>
        )}
      </div>
    </section>
  );
}
