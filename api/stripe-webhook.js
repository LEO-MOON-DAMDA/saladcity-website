import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // Stripe raw body 필요
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const buffers = await new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(buffers, req.headers["stripe-signature"], endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 🔍 결제 완료 이벤트 수신
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ 결제 완료!", session);

    // 👉 여기에 Supabase 저장, Slack 전송, 이메일 발송 등 연결 가능
  }

  res.status(200).json({ received: true });
}
