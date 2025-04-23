// ✅ /api/payment/confirm.js

import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/payment/confirm", async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;
  const secretKey = process.env.TOSS_SECRET_KEY;

  try {
    const response = await axios.post(
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

    // DB 저장 등 후속 처리 가능
    console.log("✅ 결제 승인 성공:", response.data);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ 결제 승인 실패:", err.response?.data || err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
