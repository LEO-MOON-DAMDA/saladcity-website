const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

const today = new Date().toISOString().split("T")[0];
const outputPath = path.join(__dirname, `public/data/yogiyo_reviews_${today}.json`);

const YOGIYO_ID = process.env.YOGIYO_ID;
const YOGIYO_PW = process.env.YOGIYO_PW;
const YOGIYO_STORE_ID = process.env.YOGIYO_STORE_ID;

if (!YOGIYO_ID || !YOGIYO_PW || !YOGIYO_STORE_ID) {
  console.error("❌ 요기요 로그인 정보가 .env에 없습니다.");
  process.exit(1);
}

function convertDate(text) {
  const now = new Date();
  if (!text || typeof text !== "string") return now.toISOString().split("T")[0];
  if (text.includes("분") || text.includes("방금")) return now.toISOString().split("T")[0];
  if (text.includes("시간")) return now.toISOString().split("T")[0];
  if (text.includes("어제")) now.setDate(now.getDate() - 1);
  return now.toISOString().split("T")[0];
}

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0");
  await page.setViewport({ width: 1280, height: 1600 });

  try {
    console.log("🟡 요기요 로그인 시도 중...");
    await page.goto("https://ceo.yogiyo.co.kr/login/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("#login-email");
    await page.type("#login-email", YOGIYO_ID);
    await page.type("#login-password", YOGIYO_PW);
    await page.click("button[type=submit]");
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });

    const REVIEW_URL = `https://ceo.yogiyo.co.kr/reviews/store/${YOGIYO_STORE_ID}`;
    console.log("✅ 로그인 완료. 리뷰 페이지로 이동 중...");
    await page.goto(REVIEW_URL, { waitUntil: "networkidle2", timeout: 30000 });

    const reviews = [];
    const seenKeys = new Set();
    let scrollCount = 0;

    while (scrollCount < 10) {
      const items = await page.evaluate(() => {
        const blocks = document.querySelectorAll(".review-item");
        return Array.from(blocks).map((el) => {
          const nickname = el.querySelector(".nickname")?.textContent.trim();
          const review = el.querySelector(".review")?.textContent.trim();
          const date = el.querySelector(".review-date")?.textContent.trim();
          const rating = el.querySelectorAll("svg[fill='#fcb040']").length;
          const image = el.querySelector("img")?.src || null;
          const menu = el.querySelector(".menu-list")?.textContent.trim() || "";
          return { nickname, review, rating, date, image, menu };
        });
      });

      for (const r of items) {
        const key = r.nickname + r.review + r.date;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          r.date = convertDate(r.date);
          r.platform = "요기요";
          r.store = "요기요 매장";
          reviews.push(r);
        }
      }

      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(800);
      scrollCount++;
    }

    console.log(`✅ 수집 완료: ${reviews.length}건`);
    fs.writeFileSync(outputPath, JSON.stringify(reviews, null, 2), "utf-8");
    console.log("📁 저장 완료:", outputPath);
    await browser.close();
  } catch (err) {
    console.error("❌ 오류 발생:", err.message);
    await browser.close();
    process.exit(1);
  }
})();