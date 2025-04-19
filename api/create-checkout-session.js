const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 허용됩니다." });
  }

  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: "Price ID가 없습니다." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // 또는 "payment" ← 상품 유형에 따라
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "https://saladcity.vercel.app/success",
      cancel_url: "https://saladcity.vercel.app/cancel",
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe 결제 생성 오류:", error);
    return res.status(500).json({ error: "Stripe 결제 세션 생성 실패" });
  }
}
