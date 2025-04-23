import React from "react";

export default function MarketShippingNotice() {
  return (
    <section style={{ padding: "40px 16px", backgroundColor: "#fefefe", borderTop: "1px solid #eee" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "#2f5130" }}>
          🛍️ 배송 안내 및 주의사항
        </h3>
        <ul style={{ fontSize: "14px", color: "#444", lineHeight: 1.6, paddingLeft: "16px" }}>
          <li>배송은 주문일 기준 1~2일 내 출고됩니다.</li>
          <li>제주/도서산간 지역은 추가 배송비가 발생할 수 있습니다.</li>
          <li>신선식품의 특성상 단순 변심에 의한 교환/환불은 불가합니다.</li>
          <li>상품 이상 시 사진을 첨부하여 고객센터로 문의해주세요.</li>
        </ul>
      </div>
    </section>
  );
}
