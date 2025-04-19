import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const config = {
  api: {
    bodyParser: false, // Stripe는 raw body 필요
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const buffers = await new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buffers,
      req.headers["stripe-signature"],
      endpointSecret
    );
  } catch (err) {
    console.error("❌ Webhook 서명 검증 실패:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ 결제 완료 이벤트 처리
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session?.customer_details?.email || null;
    const amount = session?.amount_total ? session.amount_total / 100 : 0;
    const currency = session?.currency || "krw";

    const { error } = await supabase.from("payments").insert([
      {
        email,
        amount,
        currency,
      },
    ]);

    if (error) {
      console.error("❌ Supabase 저장 실패:", error.message);
      return res.status(500).json({ error: "Supabase 저장 실패" });
    }

    console.log("✅ Supabase 저장 완료:", { email, amount, currency });
  }

  res.status(200).json({ received: true });
}
