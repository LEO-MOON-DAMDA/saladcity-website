import fetch from "node-fetch";

export async function notifySlack(message) {
  const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
  if (!SLACK_WEBHOOK_URL) {
    console.warn("⚠️ SLACK_WEBHOOK_URL not set");
    return;
  }

  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
    console.log("✅ Slack 알림 전송 완료");
  } catch (err) {
    console.error("❌ Slack 알림 실패:", err.message);
  }
}
