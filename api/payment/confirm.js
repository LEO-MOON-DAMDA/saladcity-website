// ✅ /api/payment/confirm.js

import express from "express";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

router.post("/payment/confirm", async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;
  const secretKey = process.env.TOSS_SECRET_KEY;

  try {
    // 1. Toss 서버에 결제 승인 요청
    const { data } = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      { paymentKey, orderId, amount },
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${secretKey}:`).toString("base64"),
          "Content-Type": "application/json",
        },
      }
    );

    // 2. Supabase에 주문 저장
    const insertRes = await supabase.from("orders").insert([
      {
        order_id: data.orderId,
        payment_key: data.paymentKey,
        customer_name: data.customerName,
        order_name: data.orderName,
        amount: data.totalAmount,
        status: data.status,
      },
    ]);

    if (insertRes.error) throw insertRes.error;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ 결제 확인 실패:", err.response?.data || err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
