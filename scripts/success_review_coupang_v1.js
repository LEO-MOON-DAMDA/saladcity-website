const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

const today = new Date().toISOString().split("T")[0];
const outputPath = path.join(__dirname, `public/data/coupang_reviews_${today}.json`);

const COUPANG_ID = process.env.COUPANG_ID;
const COUPANG_PW = process.env.COUPANG_PW;
const COUPANG_STORE = process.env.COUPANG_STORE_ID;

if (!COUPANG_ID || !COUPANG_PW || !COUPANG_STORE) {
  console.error("❌ 쿠팡이츠 로그인 정보가 .env에 없습니다.");
  process.exit(1);
}

function convertDate(text) {
  const now = new Date();
  if (!text || typeof text !== "string") return now.toISOString().split("T")[0];
  if (text.includes("분 전") || text.includes("방금")) return now.toISOString().split("T")[0];
  if (text.includes("시간 전")) return now.toISOString().split("T")[0];
  if (text.includes("어제")) now.setDate(now.getDate() - 1);
  return now.toISOString().split("T")[0];
}

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0");
  await page.setViewport({ width: 1280, height: 1600 });

  try {
    console.log("🟡 쿠팡이츠 로그인 시도 중...");
    await page.goto("https://eats.coupang.com/partner/login", { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', COUPANG_ID);
    await page.type('input[name="password"]', COUPANG_PW);
    await page.click("button[type=submit]");
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });

    const REVIEW_URL = `https://eats.coupang.com/partner/store/${COUPANG_STORE}/reviews`;
    console.log("✅ 로그인 완료. 리뷰 페이지로 이동 중...");
    await page.goto(REVIEW_URL, { waitUntil: "networkidle2", timeout: 30000 });

    const reviews = [];
    const seenKeys = new Set();
    let scrollCount = 0;

    while (scrollCount < 10) {
      const items = await page.evaluate(() => {
        const blocks = document.querySelectorAll(".review-card");
        return Array.from(blocks).map((el) => {
          const nickname = el.querySelector(".review-nickname")?.textContent.trim();
          const review = el.querySelector(".review-text")?.textContent.trim();
          const date = el.querySelector(".review-date")?.textContent.trim();
          const rating = el.querySelectorAll("svg[fill='#fbc02d']").length;
          const image = el.querySelector("img")?.src || null;
          const menu = el.querySelector(".review-menu")?.textContent.trim() || "";
          return { nickname, review, rating, date, image, menu };
        });
      });

      for (const r of items) {
        const key = r.nickname + r.review + r.date;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          r.date = convertDate(r.date);
          r.platform = "쿠팡이츠";
          r.store = "쿠팡이츠 매장";
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